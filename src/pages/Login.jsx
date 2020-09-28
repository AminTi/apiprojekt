import React from "react"
import { useHistory } from "react-router-dom"
import UserKit from "../data/UserKit"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Error, Title } from "../components/CustomersList"

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #41998c;
    width: 100%;
    height: 100%;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: center;
    align-items: center;
`
const LoginBtn = styled.button`
    background-color: blue;
    border: none;
    color: white;
    padding: 8px 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    width: 40%;
    margin: 10px;
`
const ErrorInput = styled(Error)`
    padding: 5px 5px;
`
const Inputs = styled.input`
    width: 60%;
    padding: 10px 10px;
`
const HeadTitle = styled(Title)`
    margin: 5%;
    width: 200px;
`
const Head = styled(Title)`
    margin: 5%;
`
const Activate = styled.button`
    background-color: blue;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    margin: 0 Auto;
`

const Login = () => {
    const { register, handleSubmit, errors } = useForm({ mode: "onBlur" })

    const history = useHistory()
    const userKit = new UserKit()
    const searchString = history.location.search
    const urlParam = new URLSearchParams(searchString)
    const uid = urlParam.get("uid")
    const token = urlParam.get("token")

    const userAktivate = () => {
        userKit.activateUser(uid, token).then(() => {
            history.push("/login")
        })
    }

    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        userKit
            .login(email, password)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.token)
                userKit.setToken(data.token)
                history.push("/home")
            })
    }

    return (
        <LoginWrapper>
            {uid && token ? (
                <Form>
                    <Head> Activate Accounte </Head>
                    <Activate onClick={userAktivate}> Activate </Activate>
                </Form>
            ) : (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <HeadTitle> Login </HeadTitle>
                    <Inputs
                        type="email"
                        placeholder="ex@ex.se"
                        name="email"
                        ref={register({
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />

                    <div>{errors.email && <ErrorInput>{errors.email.message}</ErrorInput>}</div>
                    <Inputs type="password" placeholder="Password" name="password" ref={register({ required: true, minLength: 8 })} />
                    <div> {errors.password && <ErrorInput> Password Invalid </ErrorInput>}</div>

                    <LoginBtn> Login </LoginBtn>
                </Form>
            )}
        </LoginWrapper>
    )
}

export default Login
