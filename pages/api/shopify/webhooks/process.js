import Shopify, { ApiVersion } from '@shopify/shopify-api';
import crypto from 'crypto'
import getRawBody from 'raw-body';
import verifyWebhook from 'verify-shopify-webhook';

const { SHOPIFY_API_KEY, SHOPIFY_SECRET_KEY, SHOPIFY_WEBHOOK_SECRET } = process.env

export default async function handler(req, res) {
    console.log('in shopify webhook process function')
    // console.log('in shopify webhook process function', req.headers)

    const shopifyHash = req.headers['x-shopify-hmac-sha256']
    const body = await getRawBody(req)

    const hash = crypto
        .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
        .update(body)
        .digest('base64')

    const verified = shopifyHash === hash
    console.log('verified: ', verified)
    console.log('body: ', JSON.parse(body.toString()))



    try {

        // res.status(200).send()

        res.status(200).json({ t: "T" })


    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).send()
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}