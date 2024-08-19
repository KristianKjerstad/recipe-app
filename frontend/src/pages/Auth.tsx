import { useAuth } from '../hooks/useAuth'

export const Auth = () => {
    const { userData } = useAuth()
    console.log('userdata', userData)

    return (
        <div>
            {/* <p>{token}</p> */}
            <p>name: {userData?.name ?? 'None'}</p>
            <p>Phone number: {userData?.phone_number ?? 'None'}</p>
            <p>birthdate: {userData?.birthdate ?? 'None'}</p>
        </div>
    )
}
