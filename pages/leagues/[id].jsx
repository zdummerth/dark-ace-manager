import React from 'react'
import Flex from 'components/shared/Flex'
import styled from 'styled-components'

const Container = styled(Flex)`
  width: 100%;
  margin: 20px;
`

function LeaguePage({ productData }) {
  return (
    <Container>
      Project
    </Container>
  )
}

// export async function getServerSideProps({ req, res, params }) {
//   // console.log({ params })

//   try {
//     const session = await getLoginSession(req, 'auth_cookie_name')
//     const league = await findLeagueByID({
//       id: params.league,
//       secret: session.accessToken
//     })
//     return {
//       props: {
//         userId: session.userId,
//         proj: league.findProjectByID
//       },
//     }
//   } catch (e) {
//     console.log('league page error', e)
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//       props: {

//       },
//     };
//   }
// }

export default LeaguePage
