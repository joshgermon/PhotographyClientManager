import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ 
  config,
  fonts: {
    heading: 'Space Grotesk',
    body: 'Space Grotesk',
  },
})

export default theme