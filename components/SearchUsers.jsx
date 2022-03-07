import React, { useState } from 'react'
// import Link from 'next/link'
import styled from 'styled-components'
import { useTwilio } from 'lib/hooks'
import { CheckDouble, X } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { BlankButton } from './shared/Button'
import dynamicSort from 'utils/dynamicSort'

const Container = styled(Flex)`
    width: 100%;
    // height: 100%;

    .suggestions {
        height: 350px;
        overflow: auto;
    }

    .check {
        color: ${({ theme }) => theme.colors.brand};
    }

    .fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
    }

    .selected-players {
        flex-wrap: wrap;
        width: 100%;
    }

    .selected-player {
        // flex: 1;
        max-width: 33%;
    }
`

const SearchUsers = ({
    onUserClick,
    className,
    users = [],
    isTeam
    // checkedUsers = []
}) => {

    // console.log('search users', users)
    const { sendMsg } = useTwilio()
    const [msg, setMsg] = useState("")
    const [value, setValue] = useState("")
    const [checked, setChecked] = useState([])
    console.log('checked users', checked)

    const handleSubmit = async () => {
        const getNumbers = (isTeam, arr) => {
            const numbers = []
            arr.forEach(element => {
                if (isTeam) {
                    numbers.push(element.players.data[0].customer.phone)
                    numbers.push(element.players.data[1].customer.phone)
                } else {
                    numbers.push(element.customer.phone)
                }
            })
            return numbers
        }

        const numbers = getNumbers(isTeam, checked)
        console.log('numbers', numbers)

        try {
            await sendMsg({ msg, numbers })
        }
        catch (e) {
            console.log('submit error')
        }
    }

    const handleChange = e => {
        // console.log('checked: ', e.target.value)
        // const playerId = e.target.value
        // console.log('playerId: ', playerId)
        const player = users.find(p => p._id === e.currentTarget.value)
        console.log('player: ', player)
        // console.log('player: ', e.currentTarget.value)


        if (checked.find(p => p._id === player._id)) {
            setChecked(
                checked.filter(c => c._id !== player._id)
            )
        } else {
            setChecked([
                ...checked,
                player
            ])
        }
    }

    const filteredUsers = users.filter(u => JSON.stringify(u).toLowerCase().includes(value.toLowerCase()))


    return (
        <Container
            dir='column'
            flex='1'
            className={className}
        >
            <div className="std-div alt-bg w-100">
                <input
                    name='invites'
                    id='invites'
                    placeholder={`search ${isTeam ? 'teams' : 'players'}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <p className='mtb-s'>suggestions</p>
            <Flex className='w-100 suggestions std-div alt-bg' dir='column'>
                {filteredUsers.sort(dynamicSort('name')).map((u, ind) => {

                    const isChecked = checked.find(p => p._id === u._id)
                    return (
                        <Flex jc='space-between' key={u._id} className='w-100 std-div bg mb-s'>
                            <div>{u.name}</div>
                            <Flex>
                                {isChecked ? (
                                    <BlankButton
                                        type='button'
                                        id={u._id}
                                        value={u._id}
                                        onClick={handleChange}
                                    >
                                        <CheckDouble className='check' size='20' />
                                    </BlankButton>
                                ) : (
                                    <BlankButton
                                        type='button'
                                        id={u._id}
                                        value={u._id}
                                        onClick={handleChange}
                                    >
                                        add
                                    </BlankButton>
                                )}
                            </Flex>
                            {/* <Flex jc='space-between' className='w-100 mt-s std-div alt-bg'>
                                <div>p: {u.phone}</div>
                                <div>e: {u.email}</div>
                            </Flex> */}

                        </Flex>
                    )
                })}
            </Flex>
            <Flex dir='column' className={'fixed std-div alt-bg'}>
                <Flex className={'selected-players std-div alt-bg'}>
                    {checked.sort(dynamicSort('name')).map(checkedPlayer => {
                        return (
                            <Flex ai='center' className='std-div border bg selected-player' key={checkedPlayer._id}>
                                <div>
                                    {checkedPlayer.name}
                                </div>
                                <BlankButton
                                    type='button'
                                    id={checkedPlayer._id}
                                    value={checkedPlayer._id}
                                    onClick={handleChange}
                                >
                                    <X size='22' />
                                </BlankButton>
                            </Flex>
                        )
                    })}
                </Flex>

                {checked.length > 0 && (
                    <Flex ai='center' jc='space-between' className={'w-100'}>
                        <input
                            name='msg'
                            id='msg'
                            placeholder='message'
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                        />
                        <BlankButton
                            type='button'
                            onClick={handleSubmit}
                        >
                            Send
                        </BlankButton>
                    </Flex>
                )}
            </Flex>
        </Container>
    )
}

export default SearchUsers