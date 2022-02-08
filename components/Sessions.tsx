import { Spinner, Flex, Heading, Badge } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Client, Session } from "../types";
import { capitalize } from "../utils/helpers";
import { supabase } from "../utils/supabaseClient";

interface SessionsProps {
    client: Client
}

const Sessions = ({ client }: SessionsProps) => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    const getClientSessions = async () => {
        const { data: sessionsData, error } = await supabase.from('session').select('*').eq('client', client.id)
        console.log(sessionsData)
        if (!error && sessionsData) {
            setSessions(sessionsData)
        } else {
            console.log(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getClientSessions();
    }, [])

    return (
        <>
            {loading ?
                <Spinner /> :
                <Flex direction='column' my={5}>
                    <Heading size='lg' mb={5}>Sessions</Heading>
                    {sessions.length ?
                        <Flex gap={5}>
                            {sessions.map((session: Session) => (
                                <Flex key={session.id} direction='column' p={8} borderRadius='16px' mb={8} w='20rem' border='solid 1px white'>
                                    <Heading mb={2} size='sm'>{capitalize(session.type)} Session</Heading>
                                    <Heading mb={2} size='xs' opacity={0.7}>{capitalize(session.location)} Session</Heading>
                                    <Badge alignSelf='start' color='purple'>New</Badge>
                                </Flex>
                            ))}
                        </Flex> :
                        <Heading size='sm'>
                            {client.first_name} has no sessions.
                        </Heading>}
                </Flex>
            }
        </>
    )
}

export default Sessions 