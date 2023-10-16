import { AppStyled } from '../styled/App.styled'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Radio,
    RadioGroup,
    Stack,
} from '@chakra-ui/react'

import { BiPlus, BiPencil, BiSolidTrash } from 'react-icons/bi'

export default function App() {
    const [height, setHeight] = useState<any>('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pudimName, setPudimName] = useState('')
    const [e_bom, setE_bom] = useState('')
    const [data, setData] = useState<any>([])
    const [idManipulate, setIdManipulate] = useState(-1)
    const [removing, setRemoving] = useState(false)

    useEffect(() => {
        getData()

        const elemnt: any = body.current
        if (elemnt) {
            setHeight(elemnt.getBoundingClientRect().height)
        }
    }, [])

    const body: any = useRef()

    function getData() {
        axios
            .get('http://134.209.175.180:8000/items')
            .then((response) => {
                const { data } = response
                setData(data)
            })
            .catch((response) => {
                console.log('deu errado', response)
            })
    }

    function handleEditItem(item: any) {
        setE_bom(item.e_bom)
        setPudimName(item.nome)
        setIdManipulate(item.id)
        onOpen()
    }

    function handleOnlyClose() {
        onClose()
        setE_bom('')
        setPudimName('')
        setIdManipulate(-1)
    }

    function handleCloseAdd() {
        onClose()
        getData()
        setE_bom('')
        setPudimName('')
        setIdManipulate(-1)

        if (idManipulate != -1) {
            handleSendEditItem()
        } else {
            handleAddPudim()
        }
    }

    function handleAddPudim() {
        onClose()
        setE_bom('')
        setPudimName('')
        setIdManipulate(-1)
        const body = {
            nome: pudimName,
            e_bom: e_bom,
        }
        axios
            .post('http://134.209.175.180:8000/cadastro', body)
            .then((response) => {
                console.log(response)
                getData()
            })
            .catch((response) => {
                console.log('deu errado cadastro', response)
            })
    }

    function handleSendEditItem() {
        onClose()
        setE_bom('')
        setPudimName('')
        setIdManipulate(-1)
        const body = {
            id: idManipulate,
            nome: pudimName,
            e_bom: e_bom,
        }
        axios
            .put(`http://134.209.175.180:8000/cadastro/${idManipulate}`, body)
            .then((response) => {
                console.log(response)
                getData()
            })
            .catch((response) => {
                console.log(response)
            })
    }

    function handleOpenRemove(item: any) {
        setRemoving(true)
        setIdManipulate(item.id)
        onOpen()
    }

    function handleRemoveItem() {
        setRemoving(false)
        onClose()
        setE_bom('')
        setPudimName('')
        setIdManipulate(-1)
        axios
            .delete(`http://134.209.175.180:8000/remove/${idManipulate}`)
            .then((response) => {
                console.log(response)
                getData()
            })
            .catch((response) => {
                console.log(response)
            })
    }

    function BasicUsage() {
        return (
            <>
                <AppStyled.ButtonArea>
                    <AppStyled.AddButton onClick={onOpen}>
                        <BiPlus />
                    </AppStyled.AddButton>
                </AppStyled.ButtonArea>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        {!removing ? (
                            <>
                                <ModalHeader>Adicionar novo pudim</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <AppStyled.ModalInputs>
                                        <p>Nome do pudim:</p>
                                        <Input
                                            value={pudimName}
                                            onChange={(event: any) =>
                                                setPudimName(event.target.value)
                                            }
                                        />
                                        <p>É bom ?</p>
                                        <div>
                                            <RadioGroup
                                                onChange={setE_bom}
                                                value={e_bom}
                                            >
                                                <Stack direction="row">
                                                    <Radio value="sim">
                                                        Sim
                                                    </Radio>
                                                    <Radio value="nao">
                                                        Não
                                                    </Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </div>
                                    </AppStyled.ModalInputs>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        colorScheme="blue"
                                        mr={3}
                                        onClick={handleOnlyClose}
                                    >
                                        Fechar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={
                                            idManipulate != -1 &&
                                            idManipulate != null
                                                ? handleSendEditItem
                                                : handleCloseAdd
                                        }
                                    >
                                        {idManipulate != -1 &&
                                        idManipulate != null
                                            ? 'Atualizar'
                                            : 'Adicionar'}
                                    </Button>
                                </ModalFooter>
                            </>
                        ) : (
                            <>
                                <ModalHeader>Remover pudim?</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <p>Deseja remover este item?</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        colorScheme="blue"
                                        mr={3}
                                        onClick={handleOnlyClose}
                                    >
                                        Fechar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={handleRemoveItem}
                                    >
                                        Confirmar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        )
    }

    return (
        <AppStyled.Container ref={body}>
            <AppStyled.Content>
                {BasicUsage()}

                <TableContainer
                    maxHeight={`${height - 105}px`}
                    overflowY={'auto'}
                >
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Nome</Th>
                                <Th>É bom ?</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((item: any, index: number) => {
                                return (
                                    <Tr key={`item-${index}-${item.id}`}>
                                        <AppStyled.Row>{item.id}</AppStyled.Row>
                                        <AppStyled.Row>
                                            {item.nome}
                                        </AppStyled.Row>
                                        <AppStyled.Row>
                                            {item.e_bom}
                                        </AppStyled.Row>
                                        <AppStyled.Row>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-around',
                                                }}
                                            >
                                                <AppStyled.EditButton
                                                    onClick={() =>
                                                        handleEditItem(item)
                                                    }
                                                >
                                                    <BiPencil />
                                                </AppStyled.EditButton>
                                                <AppStyled.RemoveButton
                                                    onClick={() =>
                                                        handleOpenRemove(item)
                                                    }
                                                >
                                                    <BiSolidTrash />
                                                </AppStyled.RemoveButton>
                                            </div>
                                        </AppStyled.Row>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <div id="tippy"></div>
            </AppStyled.Content>
        </AppStyled.Container>
    )
}
