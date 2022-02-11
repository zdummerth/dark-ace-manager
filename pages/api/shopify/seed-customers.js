import Shopify from "@shopify/shopify-api"
import { createBulkCustomers } from "lib/db/customers"
import { getLoginSession } from 'lib/auth/auth'


const shopKey = process.env.SHOPIFY_ACCESS_TOKEN
const shopName = process.env.SHOPIFY_SHOP_NAME

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
                const client = new Shopify.Clients.Graphql(shopName, shopKey);
                const queryString = `{
                    customers(first: 250 after: "eyJsYXN0X2lkIjo2MDYyNDY5NjExNzMyLCJsYXN0X3ZhbHVlIjoiNjA2MjQ2OTYxMTczMiJ9") {
                        edges {
                            node {
                              id
                              displayName
                              acceptsMarketing
                              phone
                              email
                            }
                            cursor
                          }
                          pageInfo {
                            hasNextPage
                          }
                    }
                  }`

                const response = await client.query({ data: queryString })
                if (response.body.errors) {
                    throw response.body.errors
                }

                const length = response.body.data.customers.edges.length
                const lastcursor = response.body.data.customers.edges[length - 1].cursor
                console.log('length: ', length)
                console.log('cursor: ', lastcursor)
                console.log('hasNextPage: ', response.body.data.customers.pageInfo.hasNextPage)
                const faunaData = response.body.data.customers.edges.map(({ node }) => {
                    return {
                        name: node.displayName,
                        shopifyCustomerId: node.id,
                        email: node.email,
                        phone: node.phone,
                        acceptsMarketing: node.acceptsMarketing
                    }
                })
                // console.log('fauna data', faunaData)
                const faunaCustomers = await createBulkCustomers(faunaData)
                // console.log('fauna data', faunaCustomers)



                data = response.body.data
                // data = resps
                // data = response.body.data.customers.edges
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