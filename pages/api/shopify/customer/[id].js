
import { getLoginSession } from 'lib/auth/auth'
import Shopify from "@shopify/shopify-api"

export default async function handler(req, res) {
    console.log('in customer function')
    // console.log('method: ', req.method)
    // console.log('body: ', req.body)

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        let data
        switch (req.method) {
            case 'GET': {
                const client = new Shopify.Clients.Graphql(shopName, shopKey);

                const queryString = `{
                    customer(id: "gid://shopify/Customer/4103913635993") {
                      displayName
                    }
                  }
                  `

                const response = await client.query({ data: queryString })
                if (response.body.errors) {
                    throw response.body.errors
                }

                console.log('response', response.body.data.customers.edges)

                data = response.body.data.customers.edges
                break;
            }
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