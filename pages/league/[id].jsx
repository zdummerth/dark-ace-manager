import React, { useState } from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'
import { useLeague } from 'lib/hooks'
import { getLoginSession } from 'lib/auth/auth'
import Checkin from 'components/checkin/Checkin'

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
  const [msg, setMsg] = useState('')
  const [checked, setChecked] = useState([])
  // console.log('checked: ', checked)


  const handleChange = e => {
    // console.log('checked: ', e.target.value)
    const playerId = e.target.value
    // console.log('playerId: ', playerId)
    const player = currentPlayers.find(p => p._id === playerId)
    console.log('player: ', player)


    if (checked.includes(playerId)) {
      setChecked(
        checked.filter(c => c !== playerId)
      )
    } else {
      setChecked([
        ...checked,
        playerId
      ])
    }
  }

  return (
    <Container dir='column'>
      <div className='std-div alt-bg mb-s'>{league?.title}</div>
      {/* {league?.status === 'checkin' && (
        <div className="std-div alt-bg w-100">
          <Checkin currentPlayers={currentPlayers} />
        </div>
      )} */}
      <Flex ai='center' jc='space-between' className='std-div w-100'>
        <button onClick={() => setView('teams')}>
          Teams
        </button>
        <button onClick={() => setView('players')}>
          Players
        </button>
      </Flex>
      <div className='players-box w-100'>

        {view === 'players' && (
          <div className="std-div w-100">
            {currentPlayers.map(p => {
              return (
                <Flex ai='center' jc='space-between' className="std-div alt-bg mt-s w-100" key={p._id}>
                  <div>{p.name}</div>
                  <input
                    type="checkbox"
                    id='checkbox'
                    value={p._id}
                    onChange={handleChange}
                    // onChange={() => handleChange(p.customer.phone)}
                    checked={checked.includes(p._id)}
                  />
                </Flex>
              )
            })}
          </div>
        )}

        {view === 'teams' && (
          <div className="std-div w-100">
            {currentTeams.map(t => {
              return (
                <Flex ai='center' jc='space-between' className="std-div alt-bg mt-s w-100" key={t._id}>
                  <div>{t.name}</div>
                  <input
                    id='checkbox'
                    type="checkbox"
                  />
                </Flex>
              )
            })}
          </div>
        )}
      </div>

      {/* <div className="std-div w-100"> */}
      <input
        type="text"
        name='message'
        className="std-div w-100"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      {/* </div> */}
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
