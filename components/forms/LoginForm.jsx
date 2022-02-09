import { useState } from "react"
import { BlankButton } from "components/shared/Button"
import { useRouter } from 'next/router'
import { useAuth } from "lib/hooks"
import Flex from "components/shared/Flex"
import { Album } from '@styled-icons/boxicons-regular'

const LoginForm = () => {
  const { login, updating, error } = useAuth()
  const [state, setState] = useState('')

  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    await login(state)
    router.push('/')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div className="mb-s">email</div>
        <input
          type="email"
          name="email"
          required
          value={state}
          onChange={e => setState(e.target.value)}
        />
      </label>

      <Flex
        ai='center'
        className="mt-s"
      >
        <BlankButton className='border std-div bg' type="submit" disabled={updating}>
          sign Up / login
        </BlankButton>
        {updating && <Album size='20' className="c-brand ml-xs rotate" />}
      </Flex>

      {error && <p className="error">{`Error loggin in. Please try again`}</p>}

    </form>
  )
}

export default LoginForm
