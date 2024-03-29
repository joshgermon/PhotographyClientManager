import '../styles/globals.css'
import '@fontsource/space-grotesk/500.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        updateSupabaseCookie(event, session);
    });

    return () => {
        authListener?.unsubscribe();
    };
  });

  async function updateSupabaseCookie(event: AuthChangeEvent, session: Session | null) {
    await fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
    });
  }


  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    )
}

export default MyApp
