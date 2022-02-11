import { queryFaunaGraphql } from './utils'

export const create = async ({ data, secret }) => await queryFaunaGraphql({
    variables: {
        data
    },
    secret,
    query: `mutation($date: Date!) {
    createPuttingLeaguePlayer(data: { date: $date}) {
      _id
      name
      checkedIn
      payment
    }
  }`
})

export const get = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `query($id: ID!) {
    findPuttingLeaguePlayerByID(id: $id) {
      _id
      date
      players {
        data {
          player {
            firstName
            lastName
            email
            phone
          }
          checkedIn
          payment
          wins
        }
      }
      teams {
        data {
          players {
            data {
              player {
                firstName
                lastName
              }
            }
          }
        }
      }
    }
  }
  `
})

export const update = async ({ id, data, secret }) => await queryFaunaGraphql({
    variables: {
        id,
        data
    },
    secret,
    query: `mutation($id: ID! $data: UserInput!) {
        updatePuttingLeaguePlayer(id: $id data: $data) {
        _id
        handle
      }
    }`
})

export const remove = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `mutation($id: ID!) {
        deletePuttingLeaguePlayer(id: $id) {
        _id
        handle
      }
    }`
})


export const getAll = async ({ secret }) => await queryFaunaGraphql({
    secret,
    query: `query {
    allPuttingLeagues {
      data {
        _id
        date
      }
    }
  }`
})