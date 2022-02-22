import React, { useState } from 'react'
// import Link from 'next/link'
import styled from 'styled-components'
import { CheckDouble } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { BlankButton } from './shared/Button'

const Container = styled(Flex)`
    width: 100%;
    // height: 100%;

    .suggestions {
        height: 250px;
        overflow: auto;
    }

    .check {
        color: ${({ theme }) => theme.colors.brand};
    }
`

const SearchUsers = ({
    onUserClick,
    className,
    users = [],
    checkedUsers = []
}) => {

    // console.log('search users', users)

    const [value, setValue] = useState("")

    const filteredUsers = users.filter(u => JSON.stringify(u).toLowerCase().includes(value.toLowerCase()))


    return (
        <Container
            dir='column'
            flex='1'
            className={className}
        >
            <input
                name='invites'
                id='invites'
                placeholder='search users'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <p className='mtb-s'>suggestions</p>
            <Flex className='w-100 suggestions std-div bg' dir='column'>
                {filteredUsers.map((u, ind) => {

                    const checked = checkedUsers.includes(u._id)
                    return (
                        <Flex
                            key={u._id}
                            dir='column'
                            jc='space-between'
                            className={`
                                    std-div
                                    bg 
                                    w-100
                                    border
                                    ${ind > 0 && 'mt-xs'}
                                `}
                        >
                            <Flex jc='space-between' className='w-100 std-div alt-bg'>
                                <div>{u.name}</div>
                                <Flex>
                                    {checked ? (
                                        <CheckDouble className='check' size='20' />
                                    ) : (
                                        <BlankButton
                                            type='button'
                                            id={u._id}
                                            onClick={onUserClick}
                                        >
                                            add
                                        </BlankButton>
                                    )}
                                </Flex>
                            </Flex>
                            <Flex jc='space-between' className='w-100 mt-s std-div alt-bg'>
                                <div>p: {u.phone}</div>
                                <div>e: {u.email}</div>
                            </Flex>

                        </Flex>
                    )
                })}
            </Flex>
        </Container>
    )
}

export default SearchUsers