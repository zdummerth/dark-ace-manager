import LogoutButton from 'components/forms/LogoutButton'
import { BlankButton } from 'components/shared/Button'
import Flex from 'components/shared/Flex'
import { getLoginSession } from 'lib/auth'

import styled from 'styled-components'

const Container = styled(Flex)`
  width: 100%;

  #handle {
      width: 100%;
  }
`

const Profile = ({ setTheme, userEmail }) => {

    return (
        <Container dir='column' ai='center' className='mt-s'>
            <Flex dir='column' className='std-div w-100'>
                <h2 className='alt-bg std-div w-100'>profile</h2>
                <div className="std-div alt-bg w-100 mtb-s">
                    <h3 className='mb-s'>theme</h3>
                    <Flex>
                        {['light', 'dark', 'dark-shade'].map((el, ind) => (
                            <BlankButton
                                key={el}
                                onClick={() => setTheme(el)}
                                className={`alt-div-1 bg ${ind > 0 && 'ml-xs'}`}
                            >
                                {el}
                            </BlankButton>
                        ))}
                    </Flex>
                </div>
            </Flex>
            <div>{userEmail}</div>
            <LogoutButton className='mt-s'>Logout</LogoutButton>
        </Container>
    )
}

export async function getServerSideProps({ req, res }) {
    try {
        const session = await getLoginSession(req, 'auth_cookie_name')
        return {
            props: {
                userEmail: session.email
            },
        }
    } catch {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }
}

export default Profile
