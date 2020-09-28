import React, { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import UserKit from "../data/UserKit"
import styled from "styled-components"
import { MyContext } from "../context/myContext"
import CustomersInfo from "./CustomersInfo"

export const FromContiner = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`
const InputsDivClone = styled.div`
    display: inline;
    min-width: 50%;
`

export const CreateUserBtn = styled.button`
    background-color: blue;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    padding: 14px 40px;
`

export const CustomserInputs = styled.input`
    background-color: white;
    background-position: 10px 10px;
    padding: 10px;
    margin: 5px;
    min-width: 100%;
`
export const Error = styled.p`
    color: red;
    font-size: 14px;
    display: inline;
    font-weight: bold;
`
export const Title = styled.h1`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 10px 10px;
    background: #f597a9;
    color: white;
    width: 300px;

    border-radius: 10px;
`

const CustomersList = () => {
    const customersData = useContext(MyContext)
    const userKit = new UserKit()
    const { register, handleSubmit, errors } = useForm({ mode: "onBlur" })

    const fetchClients = () => {
        userKit
            .getCustomerList()
            .then((res) => res.json())
            .then((data) => {
                customersData.setGetData(data.results)
            })
    }

    const onSubmit = (data, e) => {
        const name = data.username
        const organisationNr = data.organisationNr
        const vatNr = data.vatNr
        const reference = data.reference
        const email = data.email
        const website = data.email
        const phoneNumber = data.phone

        userKit
            .createCustomer(name, organisationNr, reference, email, phoneNumber, vatNr, website)
            .then((res) => res.json())
            .then((data) => {
                fetchClients()
            })
        e.target.reset()
    }
    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <div>
            <Title> Create Cutomers </Title>
            <FromContiner onSubmit={handleSubmit(onSubmit)}>
                <InputsDivClone>
                    <CustomserInputs type="text" name="username" placeholder="Customer Name" ref={register({ required: true, maxLength: 40, value: "SE" })} />
                    {errors.username && <Error> Customer name is required </Error>}
                </InputsDivClone>
                <InputsDivClone>
                    <CustomserInputs type="number" name="organisationNr" placeholder="organisationNR" ref={register({ required: true, maxLength: 20 })} />
                    {errors.organisationNr && <Error> organisationNR is required (Numbers) </Error>}
                </InputsDivClone>
                <InputsDivClone>
                    <CustomserInputs
                        type="text"
                        name="vatNr"
                        placeholder="vatNr"
                        ref={register({
                            validate: (value) => value !== "se" && /^\d\d\d\d\d\d\d\d\d\d$/,
                            required: true,
                            minLength: 12,
                            maxLength: 12,
                        })}
                    />
                    {errors.vatNr && <Error> Invalid VatNr (SE00000000)</Error>}
                </InputsDivClone>
                <InputsDivClone>
                    <CustomserInputs type="number" name="reference" placeholder="paymentTerm" ref={register({ required: true, minLength: 2, maxLength: 10 })} />
                    {errors.reference && <Error> Invalid Payment number </Error>}
                </InputsDivClone>
                <InputsDivClone>
                    <CustomserInputs
                        type="website"
                        placeholder="www.ex.se"
                        name="website"
                        ref={register({
                            required: true,
                            pattern: { value: /^[WWW]+[A-Z0-9.-]+\.[A-Z]{2,}$/i },
                        })}
                    />
                    {errors.website && <Error> Invalid Website adress (www.ex.com)</Error>}
                </InputsDivClone>
                <InputsDivClone>
                    <CustomserInputs
                        type="email"
                        placeholder="ex@ex.se"
                        name="email"
                        ref={register({
                            required: true,
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" },
                        })}
                    />
                    {errors.email && <Error>{errors.email.message}</Error>}
                </InputsDivClone>
                <InputsDivClone>
                    <CustomserInputs
                        type="nummber"
                        name="phone"
                        placeholder="Phonenumber"
                        ref={register({
                            required: true,
                            pattern: {
                                value: /^\d\d\d\d\d\d\d\d\d\d$/,
                            },
                        })}
                    />
                    {errors.phone && <Error> Invalid Phonenumber</Error>}
                </InputsDivClone>
                <CreateUserBtn type="onSubmit">Create Users</CreateUserBtn>
            </FromContiner>
        </div>
    )
}

export default CustomersList
