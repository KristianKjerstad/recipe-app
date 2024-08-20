import { useAuth } from '../hooks/useAuth'

export const Auth = () => {
    const { userInfo } = useAuth()
    console.log('userdata', userInfo)

    return (
        <div>
            {/* <p>{token}</p> */}
            <p>name: {userInfo?.name ?? 'None'}</p>
            <p>Phone number: {userInfo?.phone_number ?? 'None'}</p>
        </div>
    )
}
