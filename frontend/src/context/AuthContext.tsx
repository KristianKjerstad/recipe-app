import { PropsWithChildren, createContext, useState } from 'react'

type TUserInfo = { name: string; phone_number: string }

type TAuthContext = {
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
    userInfo: { name: string; phone_number: string }
    setUserInfo: (userInfo: TUserInfo) => void
    token: string
    setToken: (token: string) => void
    signOut: () => void
}

export const AuthContext = createContext<TAuthContext>({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => {},
    userInfo: { name: '', phone_number: '' },
    setUserInfo: (userInfo: TUserInfo) => {},
    token: '',
    setToken: (token: string) => {},
    signOut: () => {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<TUserInfo>({
        name: '',
        phone_number: '',
    })
    const [token, setToken] = useState<string>('')

    const signOut = () => {
        setIsAuthenticated(false)
        setUserInfo({ name: '', phone_number: '' })
        setToken('')
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: isAuthenticated,
                setIsAuthenticated: setIsAuthenticated,
                userInfo: userInfo,
                setUserInfo: setUserInfo,
                token: token,
                setToken: setToken,
                signOut: signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
