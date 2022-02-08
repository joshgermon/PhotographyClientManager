import { CloseIcon } from "@chakra-ui/icons";
import { Table, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
    clients: Array<any>
}

const ClientTable = ({clients} : Props) => {

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Mobile</Th>
                    <Th>Post Code</Th>
                    <Th>Latest Shoot</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    clients.map((client) => (
                        <Tr key={client.id}>
                            <Td>{client.first_name} {client.last_name}</Td>
                            <Td>{client.email}</Td>
                            <Td>{client.mobile}</Td>
                            <Td>{client.postal_code}</Td>
                            <Td>
                                <Link href={`/clients/${client.id}`}>
                                    <Tag>ACTIVE</Tag>
                                </Link>
                            </Td>
                            <Td><CloseIcon w={3} h={3} color='gray.400' /></Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    )
}

export default ClientTable