import React from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { useLeague } from 'lib/hooks'
import { getLoginSession } from 'lib/auth/auth'
import Checkin from 'components/checkin/Checkin'

const Container = styled(Flex)`
  width: 100%;
  margin: 20px;
`

function LeaguePage({ leagueId }) {
  // console.log('league page', leagueId)
  const { league, loading } = useLeague(leagueId)
  const currentPlayers = league ? league.players.data : []

  return (
    <Container dir='column'>
      <div className='std-div alt-bg mb-s'>league: {league?.date}</div>
      {league?.status === 'checkin' && (
        <div className="std-div alt-bg w-100">
          <Checkin currentPlayers={currentPlayers} />
        </div>
      )}
    </Container>
  )
}

export async function getServerSideProps({ req, res, params }) {
  // console.log({ params })

  try {
    const session = await getLoginSession(req, 'auth_cookie_name')

    return {
      props: {
        leagueId: params.id
      },
    }
  } catch (e) {
    console.log('league page error', e)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {

      },
    };
  }
}

export default LeaguePage
