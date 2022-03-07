import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { useLeague, useTwilio } from 'lib/hooks'
import { getLoginSession } from 'lib/auth/auth'
import Checkin from 'components/checkin/Checkin'
import SearchUsers from 'components/SearchUsers'

import { findPuttingLeagueByID } from 'lib/db/leagues'


const Container = styled(Flex)`
  width: 100%;
  margin: 20px;

  .players-box {
    max-width: 400px;
  }
  #checkbox {
    width: 20px;
  }
`

function LeaguePage({ leagueId, league }) {
  // console.log('league page', league)
  // const { league, loading } = useLeague(leagueId)
  const currentPlayers = league ? league.players.data : []
  const currentTeams = league ? league.teams.data : []

  const [view, setView] = useState('players')


  return (
    <Container dir='column'>
      <div className='std-div alt-bg mb-s'>{league?.title}</div>
      <Flex ai='center' jc='space-between' className='std-div w-100'>
        <button onClick={() => setView('teams')}>
          Teams
        </button>
        <button onClick={() => setView('players')}>
          Players
        </button>
      </Flex>
      {view === 'teams' && (
        <SearchUsers isTeam={true} users={currentTeams} />
      )}

      {view === 'players' && (
        <SearchUsers users={currentPlayers} />
      )}
    </Container>
  )
}

export async function getServerSideProps({ req, res, params }) {
  console.log({ params })

  try {
    const session = await getLoginSession(req, 'auth_cookie_name')
    const faunares = await findPuttingLeagueByID({
      id: params.id,
      secret: session.accessToken,
    })


    console.log('league', faunares.findPuttingLeagueByID)

    return {
      props: {
        leagueId: params.id,
        league: faunares.findPuttingLeagueByID
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
