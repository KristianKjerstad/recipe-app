import { Button, TextField } from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { SignatureData } from '../types/authTypes'

export const Auth = () => {
    const { userInfo } = useAuth()

    const [orgNumber, setOrgNumber] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    // console.log('userdata', userInfo)

    const isError = orgNumber && orgNumber.length !== 9

    const checkIfPersonHasSignatureRights = (
        personNummer: string,
        signatureData: SignatureData
    ) => {
        for (const [
            key,
            value,
        ] of signatureData.signeringsKombinasjon.kombinasjon.entries()) {
            console.log(key, value)
            if (value.personRolleKombinasjon.length === 1) {
            }
        }
    }

    // console.log("res: ", "https://data.brreg.no/fullmakt/enheter" + "/signature/123123".replace(/^\/signature\/(\d+)(\/.*)?$/, "/$1/signatur"))
    //console.log("res: ", "https://data.vcert.brreg.no/fullmakt/enheter" + "/signatureControl/123123/33333333".replace(/^\/signatureControl\/([^\/]+)\/([^\/]+)$/, '/$1/signatur/kontroll?fodselsnummer=$2'))

    const handleContinue = async () => {
        setErrorMessage('')
        if (orgNumber.length !== 9) {
            setErrorMessage('Invalid org number')
            return
        }
        const brregFullmaktUrl = `/signature/${orgNumber}`
        // const personNummer = "7777778888"
        //const brregControlUrl = `/signatureControl/${orgNumber}/${personNummer}`

        const signatureData: SignatureData = await axios
            .get(brregFullmaktUrl)
            .then((response: AxiosResponse) => {
                return response.data
            })
            .catch((error) => {
                setErrorMessage(error.response.data[0].message)
            })

        if (
            signatureData.enhet.konkurs === 'true' ||
            signatureData.enhet.underAvvikling === 'true' ||
            signatureData.enhet.underTvangsavviklingEllerTvangsopplosning ===
                'true'
        ) {
            setErrorMessage(
                'The company is either bankrupt or under liquidation, you cannot continue.'
            )
            return
        }

        checkIfPersonHasSignatureRights('999999999', signatureData)
    }

    return (
        <div className="pt-16">
            {/* <p>{token}</p> */}
            <p className="text-xl pb-8">Welcome, {userInfo?.name ?? 'None'}!</p>
            <p className="pb-4">Please enter your organization number</p>
            <TextField
                label="Organization number"
                value={orgNumber}
                onChange={(event) => setOrgNumber(event.target.value)}
                helperText="Must be 9 digits"
                type="number"
                error={isError}
            />

            {errorMessage && (
                <p className="text-red-600 text-xl">Error: {errorMessage}</p>
            )}
            <div className="pt-8">
                <Button
                    size="large"
                    variant="contained"
                    color="lightGreen"
                    // startIcon={<SearchOutlined />}
                    onClick={() => {
                        handleContinue()
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
