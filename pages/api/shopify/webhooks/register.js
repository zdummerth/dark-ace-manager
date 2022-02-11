import Shopify from "@shopify/shopify-api"
import { getLoginSession } from 'lib/auth/auth'


const shopKey = process.env.SHOPIFY_ACCESS_TOKEN
const shopName = process.env.SHOPIFY_SHOP_NAME

export default async function handler(req, res) {
    console.log('in shopify webhook register function')

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')


        const response = await Shopify.Webhooks.Registry.register({
            path: 'https://dark-ace-manager.vercel.app/api/shopify/webhooks/process',
            topic: 'PRODUCTS_CREATE',
            accessToken: shopKey,
            shop: shopName,
        });

        if (!response['PRODUCTS_CREATE'].success) {
            console.log(
                `Failed to register PRODUCTS_CREATE webhook: ${response['PRODUCTS_CREATE'].result.data}`
            );
        }

        // console.log('customers response data', data)

        res.status(200).json({ response })

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).send()
    }
}