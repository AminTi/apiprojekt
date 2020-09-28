import React, { useState, useEffect } from "react"
import UserKit from "../data/UserKit"
import CoustumersList from "./CustomersList"
import styled from "styled-components"
import CustomersInfo from "../components/CustomersInfo"

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    background: #f597a9;
    color: white;
    font-family: monospace;
    font-size: 20;
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #41998c;
    padding: 200px 0px;
`

const CreateCustomers = () => {
    const [items, setItems] = useState({})
    const userKit = new UserKit()

    useEffect(() => {
        userKit
            .currentUser()
            .then((response) => response.json())
            .then((data) => setItems(data))
    }, [])

    return (
        <div>
            <NavBar>
                {" "}
                <div>{`${items.firstName}  ${items.lastName}`} </div> <div>{items.email}</div>
            </NavBar>
            <CustomersInfo />

            <Container>
                <CoustumersList />
            </Container>
        </div>
    )
}

export default CreateCustomers
