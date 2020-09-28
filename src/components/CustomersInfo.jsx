import React, { useContext } from "react"
import { MyContext } from "../context/myContext"
import { Link } from "react-router-dom"
import styled from "styled-components"

const CompanyName = styled.nav`
    width: 100%;
    display: inline-block;
    word-spacing: 30px;
    padding: 10px 0px;
    background: grey;
`

const Ul = styled.ul`
    padding: 10px 10px;
    display: inline-block;
    list-style: none;
`

const CustomersInfo = () => {
    const contextData = useContext(MyContext)

    return (
        <CompanyName>
            <div>
                Companys:
                {contextData.getdata &&
                    contextData.getdata.map((item) => {
                        return (
                            <Ul key={item.id}>
                                <li>
                                    <Link to={`/DetailPage/:${item.id}`}>{item.name}</Link>
                                </li>
                            </Ul>
                        )
                    })}
            </div>
        </CompanyName>
    )
}

export default CustomersInfo
