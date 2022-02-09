import faunadb from 'faunadb'
import { v4 as uuidv4 } from 'uuid';
const {
    Let,
    Create,
    Select,
    Var,
    Collection,
    Logout,
    Tokens,
    Match,
    Index,
    Exists,
    If,
    Get,
} = faunadb.query

export const login = async (email, secret) => {
    const client = new faunadb.Client({ secret })
    return await client.query(
        Let(
            {
                accountExists: Exists(Match(Index("unique_Account_email"), email))
            },
            If(
                Var("accountExists"),
                Let(
                    {
                        accountDoc: Get(Match(Index("unique_Account_email"), email)),
                        accountRef: Select("ref", Var("accountDoc")),
                    },
                    {
                        accessToken: Select(
                            "secret",
                            Create(Tokens(), { instance: Var("accountRef") })
                        ),
                        accountId: Select(["ref", "id"], Var("accountDoc")),
                        email: Select(["data", "email"], Var("accountDoc")),
                    }
                ),
                Let(
                    {

                        newAccountDoc: Create(Collection("Account"), {
                            data: {
                                email
                            }
                        }),
                        newAccountRef: Select("ref", Var("newAccountDoc")),
                    },
                    {
                        accessToken: Select(
                            "secret",
                            Create(Tokens(), { instance: Var("newAccountRef") })
                        ),
                        accountId: Select(["ref", "id"], Var("newAccountDoc")),
                        email: Select(["data", "email"], Var("newAccountDoc")),
                    }
                )
            )
        )
    )
}

export const logout = async (secret) => {
    const client = new faunadb.Client({ secret })
    return await client.query(
        Logout(false)
    )
}