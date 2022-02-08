import { Box, Flex, Center, Heading, Stack, Input, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'


const Login: NextPage = () => {

    const router = useRouter()

    const user = supabase.auth.user()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState();
  
    const handleLogin = async (email: string, password: string) => {
      try {
        setLoading(true)
        const { user, session, error } = await supabase.auth.signIn({ email, password })
        if (error) throw error
            console.log(user)
            router.push('/clients')
        } catch (error: any) {
            setMessage(error.error_description || error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        if(user) {
            router.push('/clients')
        }
    }, [])

    return (
        <Box w='100vw' h='100vh' bg='gray.50'>
            <Head>
                <title>Login</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Center w='100%' h='100%'>
                <Flex direction='column' p={8} bg='white' borderRadius='12px' borderWidth='1px' borderColor='teal.200' boxShadow='0 2px 6px #285E6120'>
                    <Heading color='teal.700' size='lg' mb={8} textAlign='center'>Sign In</Heading>
                    <Stack spacing={4} >
                        <Input type='email' placeholder='Email' size='md'onChange={(e) =>   setEmail(e.target.value)}/>
                        <Input type='password' placeholder='Password' size='md' onChange={(e) => setPassword(e.target.value)}/>
                        <Button colorScheme='teal' type='submit' onClick={(e) => { 
                                e.preventDefault()
                                handleLogin(email, password)
                            }
                        }>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    {message ? 
                        <Box p={2} bg='red.50' borderRadius='8px'>
                            <Text color='red.600' textAlign='center'>{message}</Text> 
                        </Box> : null}
                    </Stack>
                </Flex>
            </Center>
        </Box>
    )
}

export default Login