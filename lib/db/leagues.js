import { queryFaunaGraphql } from './utils'

export const create = async ({ data, secret }) => await queryFaunaGraphql({
    variables: {
        data
    },
    secret,
    query: `mutation($date: Date!) {
    createLeague(data: { date: $date}) {
      _id
      date
    }
  }`
})

export const get = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `query($id: ID!) {
    findLeagueByID(id: $id) {
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
        updateShop(id: $id data: $data) {
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
        deleteShop(id: $id) {
        _id
        handle
      }
    }`
})


export const getAll = async ({ secret }) => await queryFaunaGraphql({
    secret,
    query: `query {
    allLeagues {
      data {
        _id
        date
      }
    }
  }`
})