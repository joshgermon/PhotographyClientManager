import { FormControl, FormLabel, Input, FormHelperText, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage } from "@chakra-ui/react"
import { supabase } from "../utils/supabaseClient"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from "react"

interface Props {
    refreshClients: () => void
}

const ClientForm = ({ refreshClients }: Props) => {

    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadError, setUploadError] = useState()

    const addNewClient: SubmitHandler<FieldValues> = async (client) => {
        const { data, error } = await supabase.from('client').insert(client)
        if (!error) {
            console.log(data)
            setUploadSuccess(true)
            await refreshClients();
        } else {
            console.log(error);
            setUploadError(error);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()

    return (
        <>
            <Button onClick={onOpen} colorScheme='orange' variant='outline'>Add Client</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Client</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(addNewClient)}>
                        <ModalBody>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                                <Input id='firstName' type='text' {...register("first_name", { required: true })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                                <Input id='lastName' type='text' {...register("last_name", { required: false })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='email'>Email address</FormLabel>
                                <Input id='email' type='email' {...register("email", { required: true })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                                <FormHelperText>We'll never share your email.</FormHelperText>
                            </FormControl>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='email'>Mobile Number</FormLabel>
                                <Input id='mobile' type='tel' {...register("mobile", { required: true })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                                <FormHelperText>We'll never share your mobile.</FormHelperText>
                            </FormControl>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='postalCode'>Postal Code</FormLabel>
                                <Input id='postalCode' type='tel' {...register("postal_code", { required: true })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type='submit'>Add</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ClientForm