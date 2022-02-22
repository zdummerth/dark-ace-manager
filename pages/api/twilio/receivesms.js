import { create, remove, update } from 'lib/db/league-player'
import twilio from 'twilio'

export default async function handler(req, res) {
    console.log('in received sms function', req.body)
    // console.log('method: ', req.method)
    // console.log('body: ', req.body)

    try {


        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const url = 'https://9363-68-184-199-121.ngrok.io/api/twilio/receivesms'
        const sig = req.headers['x-twilio-signature']
        console.log(twilio.validateRequest(authToken, sig, url, req.body));

        let data = { t: "t" }
        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}