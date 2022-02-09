import { BlankButton } from "components/shared/Button"
import { useRouter } from 'next/router'
import { useAuth } from "lib/hooks"
import Flex from "components/shared/Flex"
import { Album } from '@styled-icons/boxicons-regular'

const LogoutButton = () => {
  const { logout, updating, error } = useAuth()
  const router = useRouter()

  const handleClick = async () => {
    await logout()
    router.push('/')
  }

  return (
    <Flex
      ai='center'
      className="mt-s"
    >
      <BlankButton
        className='border std-div bg'
        type="submit"
        disabled={updating}
        onClick={handleClick}
      >
        logout
      </BlankButton>
      {updating && <Album size='20' className="c-brand ml-xs rotate" />}
      {error && <p className="error">{`Error loggin in. Please try again`}</p>}
    </Flex>
  )
}

export default LogoutButton
