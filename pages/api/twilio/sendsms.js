import { create, remove, update } from 'lib/db/league-player'
import { getLoginSession } from 'lib/auth/auth'
import twilio from 'twilio'

export default async function handler(req, res) {
    console.log('in send sms function')
    // console.log('method: ', req.method)
    // console.log('body: ', req.body)

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_FROM_NUMBER;
        const client = twilio(accountSid, authToken);


        const data = await client.messages
            .create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: fromNumber,
                to: '+13146408270'
            })

        console.log('sms response data', data)
        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}