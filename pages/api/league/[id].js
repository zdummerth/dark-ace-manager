import { createPuttingLeague, deletePuttingLeague, findPuttingLeagueByID } from 'lib/db/leagues'
import { getLoginSession } from 'lib/auth/auth'

export default async function handler(req, res) {
    console.log('in league function')
    console.log('method: ', req.method)
    // console.log('body: ', req.body)

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        let data
        switch (req.method) {
            case 'GET': {
                const { id } = req.query

                const faunares = await findPuttingLeagueByID({
                    id,
                    secret: session.accessToken,
                })

                data = faunares.findPuttingLeagueByID
                break;
            }
            case 'POST': {
                const {
                    toId,
                    projectId,
                } = req.body

                const faunares = await createPuttingLeague({
                    toId,
                    fromId: session.userId,
                    projectId,
                    secret: session.accessToken,
                })

                data = faunares.createPuttingLeague
                break;
            }
            case 'PUT': {
                // Invites can't be updated, only created and deleted.
                // => accept invites is put here to prevent creating seperate api routes
                const { id } = req.query

                const faunares = await update({
                    id,
                    data: req.body,
                    secret: session.accessToken,
                })

                data = faunares
                break;
            }
            case 'DELETE': {
                const { id } = req.query
                const faunares = await deletePuttingLeague({
                    id,
                    secret: session.accessToken,
                })

                data = faunares.deletePuttingLeague
                break;
            }
            default:
                throw { msg: "invalid method" }
        }

        console.log('league response data', data)
        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}