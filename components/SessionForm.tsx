import { FormControl, FormLabel, Input, FormHelperText, useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormErrorMessage, Select, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"
import { supabase } from "../utils/supabaseClient"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from "react"

interface Props {
    clientId: number
}

const SessionForm = ({ clientId }: Props) => {

    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadError, setUploadError] = useState()

    const addNewSession: SubmitHandler<FieldValues> = async (session) => {
        const clientSession = {
            client: clientId,
            ...session
        }
        const { data, error } = await supabase.from('session').insert(clientSession)
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
            <Button onClick={onOpen} colorScheme='orange' variant='outline' mt={5} alignSelf='flex-start'>Add New Session</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Session</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(addNewSession)}>
                        <ModalBody>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='session-type'>Session Type</FormLabel>
                                <Select id='session-type' type='text' {...register("type", { required: true })}> 
                                    <option value="family">Family</option>
                                    <option value="newborn">Newborn</option>
                                    <option value="engagement">Engagement</option>
                                    <option value="wedding">Engagement</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='duration'>Duration</FormLabel>
                                <Select id='duration' type='text' {...register("duration", { required: true })}>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="90">90 minutes</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='location'>Location</FormLabel>
                                <Input id='location' type='text' {...register("location", { required: false })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                                <FormHelperText>e.g.Rouse Hill Regional Park</FormHelperText>
                            </FormControl>
                            <FormControl mb={3} isInvalid={errors.name}>
                                <FormLabel htmlFor='sd-card'>SD Card Reference</FormLabel>
                                <NumberInput defaultValue={1} min={1} max={20}>
                                    <NumberInputField id='sd-card' {...register("sd_card", { required: false })} />
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
                            <Button type='submit'>Add</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SessionForm