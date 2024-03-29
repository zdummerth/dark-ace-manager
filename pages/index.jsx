import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Flex from 'components/shared/Flex'
import { getLoginSession } from 'lib/auth/auth'
import { useLeagues } from 'lib/hooks'
// import ProjectList from 'components/projects/ProjectList'

const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ userEmail }) {
  const { leagues } = useLeagues()

  return (
    <Container dir='column' ai='center'>
      <div>{userEmail}</div>

      <div className="std-div alt-bg w-100 mtb-s">
        <Flex jc='center' className='bg std-div w-100'>
          <h2>All leagues</h2>
        </Flex>
      </div>
      {leagues && leagues.map(l => {
        return (
          <Link href={`/league/${l._id}`} key={l._id}>
            <a className='w-100'>
              <div className="std-div alt-bg w-100 mtb-s">
                <Flex jc='center' className='bg std-div w-100'>
                  <h5>{l.title}</h5>
                </Flex>
              </div>
            </a>
          </Link>

        )
      })}

      {/* <ProjectList userId={userId} /> */}
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
