import crypto from 'crypto'
import getRawBody from 'raw-body'
import { findLeagueByProductID, getAllPuttingLeagueIDs } from 'lib/db/leagues'

const {
    SHOPIFY_WEBHOOK_SECRET,
    TEST_SHOPIFY_WEBHOOK_SECRET,
    NODE_ENV,
    FAUNA_SERVER_KEY
} = process.env

const key = NODE_ENV === 'production' ? SHOPIFY_WEBHOOK_SECRET : TEST_SHOPIFY_WEBHOOK_SECRET
export default async function handler(req, res) {
    console.log('in shopify webhook create order function')
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

        const json = JSON.parse(body.toString())
        console.log('data: ', json)

        // const currentLeagues = await getAllPuttingLeagueIDs({
        //     secret: FAUNA_SERVER_KEY
        // })

        // const leagueProductIds = currentLeagues.allPuttingLeagues.data

        // const league = await findLeagueByProductID({
        //     id: deletedProduct.id.toString(),
        //     secret: FAUNA_SERVER_KEY
        // })

        // const foundLeague = league.findLeagueByProductID?._id
        // if (foundLeague) {
        //     console.log('league found: ', league.findLeagueByProductID)
        // }

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