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
    height: 100%;
    position: relative;

    .suggestions {
        // height: 550px;
        flex: 1;
        overflow: auto;
    }

    .check {
        color: ${({ theme }) => theme.colors.brand};
    }

    .fixed {
        // flex: 1;

        // position: fixed;
        // top: 0;
        // left: 0;
        // right: 0;
        width: 100%;
    }

    .selected-players {
        flex-wrap: wrap;
        width: 100%;
    }

    .selected-player {
        flex: 1;
        max-width: 33%;
    }

    .msg-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
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
    const [msgOpen, setMsgOpen] = useState(false)
    const [value, setValue] = useState("")
    const [checked, setChecked] = useState([])
    console.log('checked users', checked)

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            setMsg('')
            setMsgOpen(false)
            setChecked([])
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
            <div className="std-div alt-bg w-100 mb-s">
                <input
                    name='invites'
                    id='invites'
                    placeholder={`search ${isTeam ? 'teams' : 'players'}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            {/* <p className='mtb-s'>suggestions</p> */}
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

                        </Flex>
                    )
                })}
            </Flex>
            <Flex dir='column' className={'fixed std-div alt-bg'}>
                {checked.length > 0 && (
                    <Flex ai='center' jc='space-between' className={'w-100 mt-s'}>
                        <button
                            type='button'
                            onClick={() => setMsgOpen(true)}
                            className='std-div active mb-s'
                        >
                            Send Message
                        </button>
                    </Flex>
                )}
                <Flex className={'selected-players'}>
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
                {msgOpen && (
                    <form onSubmit={handleSubmit}>
                        <Flex ai='center' dir='column' className={'w-100 mt-s msg-form bg'}>
                            <div className="std-div alt-bg w-100 mtb-s">
                                <input
                                    name='msg'
                                    id='msg'
                                    placeholder='message'
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                />
                            </div>

                            <Flex>
                                <button
                                    type='submite'
                                    className='std-div active mb-s'
                                >
                                    Send
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setMsgOpen(false)}
                                    className='std-div mb-s'
                                >
                                    Cancel
                                </button>
                            </Flex>
                            <div className="std-div w-100 alt-bg mt-s">
                                {checked.sort(dynamicSort('name')).map(checkedPlayer => {
                                    return (
                                        <Flex ai='center' jc='space-between' className='std-div border bg w-100' key={checkedPlayer._id}>
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
                            </div>
                        </Flex>
                    </form>
                )}
            </Flex>
        </Container>
    )
}

export default SearchUsers