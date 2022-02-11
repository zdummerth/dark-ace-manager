import { create, get, getAll } from 'lib/db/league-players'
import { getLoginSession } from 'lib/auth/auth'

export default async function handler(req, res) {
    // console.log('in leagues function')
    // console.log('method: ', req.method)
    // console.log('body: ', req.body)

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        let data
        switch (req.method) {
            case 'POST': {
                const {
                    date
                } = req.body

                const faunares = await create({
                    variables: { date },
                    secret: session.accessToken,
                })

                data = faunares.createLeague
                break;
            }
            case 'GET': {
                const faunares = await getAll({
                    secret: session.accessToken,
                })

                data = faunares.allLeagues
                break;
            }
            case 'PUT': {
                break;
            }
            case 'DELETE': {
                const { id } = req.query
                break;
            }
            default:
                throw { msg: "invalid method" }
        }

        // console.log('leagues response data', data)
        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}