import Link from 'next/link'
import styled from 'styled-components'
import { CaretUpCircle, BookOpen } from '@styled-icons/boxicons-regular'
import { useShopifyCustomers, useLeagueMutations } from 'lib/hooks'
import SearchUsers from 'components/SearchUsers'
import Flex from 'components/shared/Flex'
import { dimensions, colors } from 'styles'

const Container = styled(Flex)`
    flex-direction: column;
`

const Checkin = ({ currentPlayers = [] }) => {

    // const { customers } = useShopifyCustomers()
    return (
        <Container>
            {/* <SearchUsers users={customers} /> */}
            <div className="std-div">
                Current Players
            </div>
            <SearchUsers users={currentPlayers} />
        </Container>
    )
}

export default Checkin