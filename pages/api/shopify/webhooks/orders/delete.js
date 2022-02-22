import crypto from 'crypto'
import getRawBody from 'raw-body'
import { deletePuttingLeague, findLeagueByProductID } from 'lib/db/leagues'

const {
    SHOPIFY_WEBHOOK_SECRET,
    TEST_SHOPIFY_WEBHOOK_SECRET,
    NODE_ENV,
    FAUNA_SERVER_KEY
} = process.env

const key = NODE_ENV === 'production' ? SHOPIFY_WEBHOOK_SECRET : TEST_SHOPIFY_WEBHOOK_SECRET
export default async function handler(req, res) {
    console.log('in shopify webhook delete product function')
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

        const deletedProduct = JSON.parse(body.toString())
        console.log('body: ', deletedProduct)

        const league = await findLeagueByProductID({
            id: deletedProduct.id.toString(),
            secret: FAUNA_SERVER_KEY
        })

        const foundLeague = league.findLeagueByProductID?._id
        if (foundLeague) {
            console.log('league found: ', league.findLeagueByProductID)

            const deletedLeague = await deletePuttingLeague({
                id: league.findLeagueByProductID._id,
                secret: FAUNA_SERVER_KEY
            })

            console.log('league deleted: ', deletedLeague)
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