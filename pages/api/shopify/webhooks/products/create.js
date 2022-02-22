import crypto from 'crypto'
import getRawBody from 'raw-body'
import { createPuttingLeague } from 'lib/db/leagues'

const {
    SHOPIFY_WEBHOOK_SECRET,
    TEST_SHOPIFY_WEBHOOK_SECRET,
    NODE_ENV,
    FAUNA_SERVER_KEY
} = process.env

const key = NODE_ENV === 'production' ? SHOPIFY_WEBHOOK_SECRET : TEST_SHOPIFY_WEBHOOK_SECRET
export default async function handler(req, res) {
    console.log('in shopify webhook create product function')
    // console.log('in shopify webhook process function', req.headers)

    try {

        const shopifyHash = req.headers['x-shopify-hmac-sha256']
        const body = await getRawBody(req)

        const hash = crypto
            .createHmac('sha256', key)
            .update(body)
            .digest('base64')

        const verified = shopifyHash === hash
        console.log('verified: ', verified)
        if (!verified) {
            throw { msg: "Request could not be verified" }
        }

        const newProduct = JSON.parse(body.toString())
        // console.log('body: ', JSON.parse(body.toString()))

        if (newProduct.product_type === 'Putting League') {
            const newLeague = await createPuttingLeague({
                data: {
                    title: newProduct.title,
                    productId: newProduct.id.toString(),
                    status: 'pending'
                },
                secret: FAUNA_SERVER_KEY
            })

            console.log('new league created: ', newLeague)
        }

        res.status(200).send()

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