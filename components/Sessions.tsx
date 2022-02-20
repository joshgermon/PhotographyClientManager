import { Spinner, Flex, Heading, Badge, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Client, Session } from "../types";
import { capitalize } from "../utils/helpers";
import { supabase } from "../utils/supabaseClient";
import InvoiceForm from "./InvoiceForm";
import SessionForm from "./SessionForm";

interface SessionsProps {
    client: Client
}

const Sessions = ({ client }: SessionsProps) => {
    // const [sessions, setSessions] = useState<Session[]>([]);
    // const [loading, setLoading] = useState(true);

    return (

        <Flex direction='column' my={5}>
            <Heading size='lg' mb={5}>Sessions</Heading>
            {client.sessions.length ?
                <Flex gap={5}>
                    {client.sessions.map((session: Session) => (
                        <Flex key={session.id} direction='column' p={8} borderRadius='16px' mb={8} w='20rem' border='solid 1px white'>
                            <Heading mb={2} size='sm'>{capitalize(session.type)} Session</Heading>
                            <Heading mb={2} size='xs' opacity={0.7}>{capitalize(session.location)} Session</Heading>
                            <Badge alignSelf='flex-start' color='purple'>New</Badge>
                            <InvoiceForm clientId={client.id} sessionId={session.id}/>
                        </Flex>
                    ))}
                </Flex> :
                <Heading size='sm'>
                    {client.first_name} has no sessions.
                </Heading>}
                <SessionForm clientId={client.id} />
        </Flex>
    )
}

export default Sessions 