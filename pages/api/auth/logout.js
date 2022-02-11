import { getLoginSession } from 'lib/auth/auth'
import { logout } from 'lib/db/auth'
import { removeTokenCookie } from 'lib/auth/auth-cookies'
import { magic } from 'lib/auth/magicAdmin'


export default async function handler(req, res) {
  console.log('in logout function')
  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    console.log('session in logout', session)
    const loggedOut = await logout(session.accessToken)
    await magic.users.logoutByIssuer(session.issuer);
    console.log('logout', loggedOut)

    removeTokenCookie(res, 'auth_cookie_name')
    // After getting the session you may want to fetch for the user instead
    // of sending the session's payload directly, this example doesn't have a DB
    // so it won't matter in this case
    res.status(200).json({ success: true })
  } catch(e) {
    console.log('error in logout', e)
    res.status(400).json({ error: true })
  }
}
