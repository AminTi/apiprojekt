import React, { useState } from "react"
import styled from "styled-components"
import { Switch, Route } from "react-router-dom"
import CreateCustomers from "./components/CreateCustomers"
import CreateUser from "./pages/CreateUser"
import Login from "./pages/Login"
import { MyContext } from "./context/myContext"
import DetailPage from "./components/DetailPage.jsx"

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
`

function App() {
    const [getdata, setGetData] = useState()

    return (
        <AppWrapper>
            <MyContext.Provider value={{ getdata, setGetData }}>
                <Switch>
                    <Route path="/" exact component={CreateUser} />
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={CreateCustomers} />
                    <Route path="/DetailPage" component={DetailPage} />
                </Switch>
            </MyContext.Provider>
        </AppWrapper>
    )
}

export default App
