import { FormControl, FormLabel, Input, FormHelperText, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage, Select, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { supabase } from "../utils/supabaseClient"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from "react"

interface Props {
    clientId: number
    sessionId: number
}

const InvoiceForm = ({ clientId, sessionId }: Props) => {

    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadError, setUploadError] = useState()

    const addNewInvoice: SubmitHandler<FieldValues> = async ({total}) => {
        const sessionInvoice = {
            session: sessionId,
            client: clientId,
            total: total * 100,
            paid: 0,        
            balance: total * 100,
            deposit_amount: total/2 * 100,
            due_date: new Date(Date.now() + 12096e5),
            deposit_due_date: new Date(Date.now() + 12096e5)
        }
        const { data, error } = await supabase.from('invoice').insert(sessionInvoice)
        if (!error) {
            console.log(data)
            setUploadSuccess(true)
        } else {
            console.log(error);
            setUploadError(error);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()

    return (
        <>
            <Button onClick={onOpen} colorScheme='orange' variant='link' mt={3} alignSelf='flex-start'>Create Invoice</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Invoice</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(addNewInvoice)}>
                        <ModalBody>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='total'>Invoice Amount</FormLabel>
                                <NumberInput defaultValue={299} min={1} max={10000}>
                                    <NumberInputField id='total' {...register("total", { required: true })} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type='submit'>Create</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default InvoiceForm