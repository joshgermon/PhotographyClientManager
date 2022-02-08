import {
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    button: string
    submit: {
        text: string,
        action: (ClientData: any) => void
    }
    title: string
    children: ReactNode
}

const ModalForm = ({ button, submit, title, children }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>{button}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={submit.action}>{submit.text}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalForm