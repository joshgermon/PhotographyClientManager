import { Box, Heading, Spinner } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import enforceAuth from '../../utils/enforceAuth';
import AppView from '../../components/layouts/AppView'
import ClientForm from '../../components/ClientForm';
import ClientTable from '../../components/ClientTable';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';


const Home: NextPage = () => {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const getClients = async () => {
    const { data, error } = await supabase.from('client').select('*');
    if (!error) {
      setClients(data);
    } else {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getClients();
  }, [])

  // Logged in
  return (
    <Box>
      <Head>
        <title>PictureThis - Clients</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppView>
        <Box p={10}>
          <Heading mb={5}>Your Clients</Heading>
          <Box my={6}>
            {loading ?
              <Spinner />
              :
              <ClientTable clients={clients} />
            }
          </Box>
          <ClientForm refreshClients={getClients} />
        </Box>
      </AppView>
    </Box>
  )
}

export const getServerSideProps = enforceAuth();

export default Home
