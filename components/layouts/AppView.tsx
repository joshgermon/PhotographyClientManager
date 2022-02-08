import { Flex, Box, Heading  } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Sidebar from '../Sidebar';

interface Props {
    children: ReactNode
}

const AppView = ({children}: Props) => {
    return (
    <Flex w='100vw' h='100vh'>
        <Sidebar />
        <Box w='100%' h='100%' bg='grey.200'>
            { children }
        </Box>
    </Flex>
    )
}

export default AppView