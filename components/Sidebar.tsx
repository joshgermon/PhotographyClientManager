import { CalendarIcon, ExternalLinkIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { Flex, Box, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

const Sidebar = () => {
    
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            console.log('Logged out');
            router.push('/login')
        }catch(error) {
            console.log(error);
        } 
    }

    return (
        <Flex as='nav' direction='column' align='center' justify='start' flex='0 1 6rem' px={8} py={6} height='100%' top={0} left={0}>
            <Stack spacing={10} pt={20}>
                <Link href='/clients'>
                    <CalendarIcon cursor='pointer' w={5} h={5} />
                </Link>
                <Link href='/'>
                    <RepeatClockIcon cursor='pointer' w={5} h={10} />
                </Link>
                <Box onClick={handleSignOut}>
                    <ExternalLinkIcon cursor='pointer' w={5} h={5} />
                </Box>
            </Stack>
        </Flex>
    );
}

export default Sidebar;