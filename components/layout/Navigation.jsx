import React from 'react'
import Link from "next/link"
import styled from 'styled-components'
import { Home, User } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'

const Nav = styled(Flex)`
  position: relative;

  .invite-container {
    position: absolute;
    top: 120%;
    left: 0;
    width: 100%;
    max-width: 500px;
    z-index: 3;
    box-shadow: 0 0 5px 0px ${({ theme }) => theme.colors.text};

    i {
      margin: 10px 0;
      align-self: center;
    }
  }
`

const Navigation = () => {
  // console.log('invites', invites)
  return (
    <Nav ai='center' className='bg w-100'>
      <Link href='/' name='Home'>
        <a>
          <Flex className='std-div bg' dir='column' ai='center'>
            <Home size='20' />
          </Flex>
        </a>
      </Link>
      <Link href='/profile' name='profile'>
        <a>
          <Flex className='std-div bg ml-xs' dir='column' ai='center'>
            <User size='20' />
          </Flex>
        </a>
      </Link>
    </Nav>
  )
}

export default Navigation
