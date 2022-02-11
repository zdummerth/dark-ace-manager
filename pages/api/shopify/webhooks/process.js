import Shopify from "@shopify/shopify-api"
import { getLoginSession } from 'lib/auth/auth'


const shopKey = process.env.SHOPIFY_ACCESS_TOKEN
const shopName = process.env.SHOPIFY_SHOP_NAME

export default async function handler(req, res) {
    console.log('in shopify webhook register function')

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')


        const response = Shopify.Webhooks.Registry.process(req, res);

        console.log('webhook response data', response)

        res.status(200).json({ response })

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).send()
    }
}