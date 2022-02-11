import { getAllCustomers, create } from "lib/db/customers"
import { getLoginSession } from 'lib/auth/auth'

export default async function handler(req, res) {
    console.log('in shopify customers function')

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
                const faunares = await getAllCustomers({
                    secret: session.accessToken,
                })

                data = faunares.getAllCustomers
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

        // console.log('customers response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).send()
    }
}