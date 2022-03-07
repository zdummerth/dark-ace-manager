import { getLoginSession } from 'lib/auth/auth'
import twilio from 'twilio'

export default async function handler(req, res) {
    console.log('in send sms function')
    // console.log('method: ', req.method)
    console.log('body: ', req.body)
    // const numbers = ['+13146750275', '+13146408270']

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_FROM_NUMBER;
        const client = twilio(accountSid, authToken);
        const service = client.notify.services(process.env.TWILIO_PUTTING_LEAGUE_SERVICE_SID)

        const bindings = req.body.numbers.map(number => {
            return JSON.stringify({ binding_type: 'sms', address: number });
        });


        const data = await service
            .notifications
            .create({
                body: req.body.msg,
                toBinding: bindings
            })

        console.log('sms response data', data)

        // let data = { t: "d" }
        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}