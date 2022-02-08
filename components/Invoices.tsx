import { Spinner, Flex, Heading, Badge } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Client, Session } from "../types";
import { capitalize } from "../utils/helpers";
import { supabase } from "../utils/supabaseClient";

interface InvoicesProps {
    client: Client
}

const Invoices = ({ client }: InvoicesProps) => {
    const [invoices, setInvoices] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    const getClientInvoices = async () => {
        const { data: invoicesData, error } = await supabase.from('invoice').select('*').eq('client', client.id)
        console.log(invoicesData)
        if (!error && invoicesData) {
            setInvoices(invoicesData)
        } else {
            console.log(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getClientInvoices();
    }, [])

    return (
        <>
            {loading ?
                <Spinner /> :
                <Flex direction='column' my={5}>
                    <Heading size='lg' mb={5}>Invoices</Heading>
                    {invoices.length ?
                        <Flex gap={5}>
                            {invoices.map((invoice: Session) => (
                                <Flex key={invoice.id} direction='column' p={8} borderRadius='16px' mb={8} w='20rem' border='solid 1px white'>
                                    <Heading mb={2} size='sm'>{capitalize(invoice.type)} Invoice</Heading>
                                    <Heading mb={2} size='xs' opacity={0.7}>{capitalize(invoice.location)} Invoice</Heading>
                                    <Badge alignSelf='start' color='purple'>New</Badge>
                                </Flex>
                            ))}
                        </Flex> :
                        <Heading size='sm'>
                            {client.first_name} has no invoices.
                        </Heading>}
                </Flex>
            }
        </>
    )
}

export default Invoices 