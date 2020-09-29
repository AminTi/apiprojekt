import React from "react"
import { useForm } from "react-hook-form"

import styled from "styled-components"
import UserKit from "../data/UserKit"
import { FromContiner, CreateUserBtn, CustomserInputs, Error } from "../components/CustomersList"

const InputWrapper = styled(FromContiner)`
    width: 100vw;
    height: 100vh;
    background: #41998c;
    padding: 200px 0px;
    margin: unset;
`
const Inputs = styled(CustomserInputs)`
    min-width: 100%;
`
const CreateBtn = styled(CreateUserBtn)``
const ErrorOutPut = styled(Error)`
    padding: 5px 5px;
`

export const CreateUsers = styled.h1`
    display: flex;
    justify-content: center;
    background: #f597a9;
    color: white;
    padding: 10px 10px;
    width: 300px;
    border-radius: 10px;
`
const InputsDiv = styled.div`
    display: inline;
    min-width: 50%;
`

const CreateUser = () => {
    const userKit = new UserKit()
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = (data, e) => {
        const firstName = data.firstName
        const lastName = data.lastName
        const email = data.email
        const password = data.password
        const organisationName = data.organisationName
        const organisationKind = data.organisationKind
        userKit.register(firstName, lastName, email, password, organisationName, organisationKind)
        e.target.reset()
    }

    return (
        <InputWrapper onSubmit={handleSubmit(onSubmit)}>
            <CreateUsers> Create Amin</CreateUsers>
            <InputsDiv>
                <Inputs type="text" placeholder="FirstName" name="firstName" ref={register({ required: true, minLength: 2 })} />{" "}
                {errors.firstName && <ErrorOutPut> Firstname is required </ErrorOutPut>}
            </InputsDiv>
            <InputsDiv>
                <Inputs type="text" placeholder="LastName" name="lastName" ref={register({ required: true, minLength: 2 })} />
                {errors.lastName && <ErrorOutPut> Lastname is required </ErrorOutPut>}
            </InputsDiv>
            <InputsDiv>
                <Inputs type="text" placeholder="email@ex.se" name="email" ref={register({ required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })} />
                {errors.email && <ErrorOutPut> Invalid email </ErrorOutPut>}
            </InputsDiv>
            <InputsDiv>
                <Inputs type="password" placeholder="password" name="password" ref={register({ required: true, minLength: 8 })} />
                {errors.password && <ErrorOutPut> Invalid password (8char) </ErrorOutPut>}
            </InputsDiv>
            <InputsDiv>
                <Inputs type="text" placeholder="organisationName" name="organisationName" ref={register({ required: true })} />
                {errors.organisationName && <ErrorOutPut> organisationName is required </ErrorOutPut>}
            </InputsDiv>
            <InputsDiv>
                <Inputs type="number" placeholder="012" name="organisationKind" ref={register({ required: true, maxLength: 1 })} />
                {errors.organisationKind && <ErrorOutPut> organisationKind is required. try 1,2,3</ErrorOutPut>}
            </InputsDiv>
            <CreateBtn type="submit">Create User</CreateBtn>
        </InputWrapper>
    )
}

export default CreateUser
