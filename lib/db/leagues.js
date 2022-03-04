import { queryFaunaGraphql } from './utils'

export const createPuttingLeague = async ({ data, secret }) => await queryFaunaGraphql({
  variables: {
    data
  },
  secret,
  query: `mutation($data: PuttingLeagueInput!) {
    createPuttingLeague(data: $data) {
      _id
      date
      title
      status
    }
  }`
})

export const findLeagueByProductID = async ({ id, secret }) => await queryFaunaGraphql({
  variables: {
    id
  },
  secret,
  query: `query($id: String) {
    findLeagueByProductID(productId: $id) {
      _id
    }
  }`
})

export const findPuttingLeagueByID = async ({ id, secret }) => await queryFaunaGraphql({
  variables: {
    id
  },
  secret,
  query: `
  query($id: ID!) {
    findPuttingLeagueByID(id: $id) {
      _id
      title 
      players {
        data {
          _id
          name
          customer {
            name
            phone
            email
          }
        }
      }
      teams {
        data {
          _id
          name
          players {
            data {
              _id
              name
              customer {
                phone
                email
              }
            }
          }
        }
      }
    }
  }`
})

export const getPuttingLeague = async ({ id, secret }) => await queryFaunaGraphql({
  variables: {
    id
  },
  secret,
  query: `query($id: ID!) {
    findPuttingLeagueByID(id: $id) {
      _id
      date
      status
      title
      players {
        data {
          customer {
            name
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
              customer {
                email
                phone
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
        updatePuttingLeague(id: $id data: $data) {
        _id
        handle
      }
    }`
})

export const deletePuttingLeague = async ({ id, secret }) => await queryFaunaGraphql({
  variables: {
    id
  },
  secret,
  query: `mutation($id: ID!) {
        deletePuttingLeague(id: $id) {
        _id
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
        title
      }
    }
  }`
})

export const getAllPuttingLeagueIDs = async ({ secret }) => await queryFaunaGraphql({
  secret,
  query: `query {
    allPuttingLeagues {
      data {
        _id
      }
    }
  }`
})

export const getAllPuttingLeaguesByStatus = async ({ secret }) => await queryFaunaGraphql({
  secret,
  query: `query($status: LeagueStatus) {
    allPuttingLeaguesByStatus(status: $status) {
      data {
        _id
      }
    }
  }`
})

export const createPlayer = async ({ data, secret }) => await queryFaunaGraphql({
  variables: {
    data
  },
  secret,
  query: `mutation($data: PuttingLeaguePlayerInput!) {
    createPuttingLeaguePlayer(data: $data) {
      _id
      name
      checkedIn
      payment
      
    }
  }`
})

export const updatePlayer = async ({ id, data, secret }) => await queryFaunaGraphql({
  variables: {
    id,
    data
  },
  secret,
  query: `mutation($id: ID! $data: PuttingLeaguePlayerInput!) {
      updatePuttingLeaguePlayer(id: $id data: $data) {
      _id
      name
      checkedIn
      payment
      phone
      email
    }
  }`
})

export const removePlayer = async ({ id, secret }) => await queryFaunaGraphql({
  variables: {
    id
  },
  secret,
  query: `mutation($id: ID!) {
      deletePuttingLeaguePlayer(id: $id) {
      _id
    }
  }`
})