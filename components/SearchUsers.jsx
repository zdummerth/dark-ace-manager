import React, { useState, useRef } from 'react'
// import Link from 'next/link'
import styled from 'styled-components'
import SendSmsForm from './forms/SendSmsForm'
import { useTwilio } from 'lib/hooks'
import { CheckDouble, X, Album } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import { BlankButton } from './shared/Button'
import dynamicSort from 'utils/dynamicSort'

const Container = styled(Flex)`
    width: 100%;
    height: 100%;
    position: relative;

    .suggestions {
        flex: 1;
        max-height: 50vh;
        overflow: auto;
    }


    .check {
        color: ${({ theme }) => theme.colors.brand};
    }

    .msg-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        max-width: 500px;
    }

    .btn-container {
        height: 45px;
    }

    .error {
        font-size: 14px;
        color: red;
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
    const { sendMsg, updating: twUpdating, error: twError, setState: setTwilioState, submitted } = useTwilio()
    const [msgOpen, setMsgOpen] = useState(false)
    const [value, setValue] = useState("")
    const [checked, setChecked] = useState([])
    console.log('checked users', checked)

    const searchInputRef = useRef()

    const handleCancel = () => {
        setMsgOpen(false)
        setTwilioState({
            updating: false,
            error: false,
            submitted: false
        })
    }

    if (submitted) {
        handleCancel()
        setChecked([])
        setValue('')
    }

    const handleSubmit = async ({ message }) => {
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

        await sendMsg({ msg: message, numbers })
    }


    const handleChange = e => {
        // console.log('checked: ', e.target.value)

        const player = users.find(p => p._id === e.currentTarget.value)

        if (checked.find(p => p._id === player._id)) {
            setChecked(
                checked.filter(c => c._id !== player._id)
            )
            searchInputRef.current?.focus()
        } else {
            setChecked([
                ...checked,
                player
            ])
            searchInputRef.current?.focus()

        }
    }

    const filteredUsers = users.filter(u => JSON.stringify(u).toLowerCase().includes(value.toLowerCase()))


    return (
        <Container
            dir='column'
            flex='1'
            className={className}
        >
            {msgOpen ? (
                <>
                    <Flex ai='center' dir='column' className={'w-100 mt-s msg-form bg'}>
                        <div className="std-div alt-bg w-100 mtb-s">
                            <SendSmsForm
                                onCancel={handleCancel}
                                updating={twUpdating}
                                onSubmit={handleSubmit}
                                error={twError}
                            />
                        </div>

                        <PlayerList
                            players={checked}
                            checked={checked}
                            handleChange={handleChange}
                            childClassName={'alt-div-1 border bg ml-xs mt-xs'}
                            className={'flex-ai-c fl-wrap std-div w-100 alt-bg mt-s'}
                            title={'To:'}
                        />
                    </Flex>
                </>
            ) : (
                <>
                    <div className="std-div alt-bg w-100 mb-s">
                        <input
                            name='players'
                            id='players'
                            ref={searchInputRef}
                            placeholder={`search ${isTeam ? 'teams' : 'players'}`}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <PlayerList
                        players={filteredUsers.sort(dynamicSort('name'))}
                        checked={checked}
                        handleChange={handleChange}
                        childClassName={'std-div w-100 border bg mt-xs'}
                        className={'suggestions flex fd-col std-div w-100 alt-bg mt-s'}
                    />
                </>
            )}

            {checked.length > 0 && (
                <Flex dir='column' className={'std-div w-100 mt-s border-top'}>
                    <Flex ai='center' jc='space-between' className={'w-100 mt-s'}>
                        <button
                            type='button'
                            onClick={() => setMsgOpen(true)}
                            className='std-div active mb-s'
                        >
                            Create Message
                        </button>
                    </Flex>
                    <PlayerList
                        players={checked}
                        checked={checked}
                        handleChange={handleChange}
                        childClassName={'alt-div-1 border bg ml-xs mt-xs'}
                        className={'flex-ai-c fl-wrap std-div w-100 alt-bg mt-s'}
                        title={'To:'}
                    />
                </Flex >

            )}
        </Container >
    )
}

const PlayerList = ({
    players,
    title,
    handleChange,
    className,
    childClassName,
    checked = []
}) => {

    return (
        <div className={`${className}`}>
            {title && (
                <div className="std-div">{title}</div>
            )}
            {players.sort(dynamicSort('name')).map(player => {
                const isChecked = checked.find(p => p._id === player._id)

                return (
                    <Flex
                        ai='center'
                        jc='space-between'
                        className={`${childClassName}`}
                        key={player._id}>

                        <div>
                            {player.name}
                        </div>
                        <BlankButton
                            type='button'
                            id={player._id}
                            value={player._id}
                            onClick={handleChange}
                        >
                            {isChecked ? (
                                <X size='18' />
                            ) : (
                                <div>add</div>
                            )}
                        </BlankButton>
                    </Flex>
                )
            })}
        </div>
    )
}

export default SearchUsers