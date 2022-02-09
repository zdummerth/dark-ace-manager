import { createInvite, deleteInvite, acceptInvite } from 'lib/db/league-player'
import { getLoginSession } from 'lib/auth'

export default async function handler(req, res) {
    console.log('in league player function')
    console.log('method: ', req.method)
    // console.log('body: ', req.body)

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        let data
        switch (req.method) {
            case 'POST': {
                const {
                    toId,
                    projectId,
                } = req.body

                const faunares = await createInvite({
                    toId,
                    fromId: session.userId,
                    projectId,
                    secret: session.accessToken,
                })

                data = faunares.createInvite
                break;
            }
            case 'PUT': {
                // Invites can't be updated, only created and deleted.
                // => accept invites is put here to prevent creating seperate api routes
                const { id } = req.query

                const faunares = await acceptInvite({
                    id,
                    secret: session.accessToken,
                })

                data = faunares
                break;
            }
            case 'DELETE': {
                const { id } = req.query
                const faunares = await deleteInvite({
                    id,
                    secret: session.accessToken,
                })

                data = faunares.deleteInvite
                break;
            }
            default:
                throw { msg: "invalid method" }
        }

        console.log('invite response data', data)
        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}