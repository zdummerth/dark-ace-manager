import faunadb from 'faunadb'
import { queryFaunaGraphql } from './utils'

const {
    Let,
    Create,
    Select,
    Var,
    Collection,
    Foreach,
    Lambda,
    Logout,
    Tokens,
    Match,
    Index,
    Exists,
    If,
    Get,
} = faunadb.query



export const createBulkCustomers = async (dataArray) => {
    const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    return await client.query(
        Foreach(dataArray, Lambda("newCustomer", Create(Collection("Customer"), {
            data: Var("newCustomer")
        })))
    )
}

export const create = async ({ data, secret }) => await queryFaunaGraphql({
    variables: {
        data
    },
    secret,
    query: `mutation($data: CustomerInput!) {
    createCustomer(data: $data) {
      _id
      name
      phone
      email
    }
  }`
})

export const getAllCustomers = async ({ data, secret }) => await queryFaunaGraphql({
    variables: {
        data
    },
    secret,
    query: `query {
        allCustomers(_size: 1500) {
          data {
            _id
            name
            email
            phone
          }
        }
      }
      `
})