import { createTheme, PaletteColorOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface CustomPalette {
        orange: PaletteColorOptions
        apple: PaletteColorOptions
        steelBlue: PaletteColorOptions
        violet: PaletteColorOptions
    }
    type Palette = CustomPalette
    type PaletteOptions = CustomPalette
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        orange: true
        apple: true
        steelBlue: true
        violet: true
    }
}

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: any) =>
    augmentColor({ color: { main: mainColor } })
export const theme = createTheme({
    palette: {
        mode: 'dark',
        // eslint-disable-next-line
        //@ts-ignore
        orange: createColor('#D35100'),
        apple: createColor('#5DBA40'),
        steelBlue: createColor('#5C76B7'),
        violet: createColor('#BC00A3'),
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
})
