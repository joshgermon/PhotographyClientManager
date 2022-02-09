import { Box, Flex, Center, Heading, Stack, Input, Button, Spinner, Badge } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import AppView from '../../components/layouts/AppView'
import Sessions from '../../components/Sessions'
import { Client } from '../../types'
import Invoices from '../../components/Invoices'

const Client: NextPage = ({ client, error }) => {

    const router = useRouter();
    const {id} = router.query

    return (
        <Box w='100vw' h='100vh'>
            <Head>
                <title>Client {id}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppView>
                <Box p={10}>
                    <Heading mb={10}>{client.first_name} {client.last_name}</Heading>
                    <Sessions client={client}/>
                    <Invoices client={client}/>
                </Box>
            </AppView>
        </Box>
    )
}

export async function getServerSideProps(context) {

    const id = context.params.id

    const { data: client, clientError } = await supabase.from('client').select('*').eq('id', id)
    const { data: sessionsData, sessionsError } = await supabase.from('session').select('*').eq('client', client[0].id)

    const clientWithSessions = {
        ...client[0],
        sessions: sessionsData
    }

    return {
      props: {client: clientWithSessions}, // will be passed to the page component as props
    }
  }

export default Client