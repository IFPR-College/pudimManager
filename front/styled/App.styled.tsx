import { Td } from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled.div`
    max-height:100%;
    max-width:100%;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #352F44;
`

const Content = styled.div`
    width:calc(100% - 50px);
    height:calc(100% - 50px);
    border-radius: 15px;
    background-color: #B9B4C7;
`

const Button = styled.div`
    height:40px;
    width:45px;
    border-radius: 15px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    user-select: none;
`

const ButtonArea = styled.div`
    height: 55px;
    border-bottom: 1px solid black;
    display:flex;
    align-items:center;

`

const AddButton = styled(Button)`
    background-color: #D6D5A8;
    margin: 10px;
`

const EditButton = styled(Button)`
    background-color: #8CABFF;
`
const RemoveButton = styled(Button)`
    background-color: #D21312;
`

const ModalInputs = styled.div`
    display:flex;
    flex-direction: column;
`

const Row = styled(Td)`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 150px;
`

export const AppStyled = {
    AddButton: AddButton,
    Container: Container,
    Content: Content,
    EditButton: EditButton,
    RemoveButton: RemoveButton,
    ButtonArea: ButtonArea,
    ModalInputs: ModalInputs,
    Row: Row
}