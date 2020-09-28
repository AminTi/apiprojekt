import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { MyContext } from "../context/myContext"
import styled from "styled-components"
import { FromContiner, CreateUserBtn, CustomserInputs, Error } from "./CustomersList"
import { CreateUsers } from "../pages/CreateUser"
import UserKit from "../data/UserKit"

const DetailPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #41998c;
    padding: 200px 50px;
`
const CustomersDetails = styled(CreateUsers)``

const SubWrapper = styled.div`
    background: white;
    padding: 20px 20px;
    border-radius: 10px;
    width: 40%;
`
const CustomersInfo = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 10px 10px;
`
const Span = styled.span`
    font-size: 16px;
    padding: 10px 10px;
`

// #f597a9

function DetailPage(props) {
    const history = useHistory()
    const dataContext = useContext(MyContext)

    const url = props.location.pathname
    let id = url.replace(/[\D]/g, "")
    const userKit = new UserKit()

    const Delete = () => {
        id && userKit.DeleteCustomer(id)
        history.push("/home")
        userKit
            .getCustomerList()
            .then((res) => res.json())
            .then((data) => {
                dataContext.setGetData(data.results)
            })
    }

    let data =
        dataContext.getdata &&
        dataContext.getdata.filter((obj) => {
            return obj.id == id
        })

    return (
        <DetailPageWrapper>
            <CreateUsers>Customer Details</CreateUsers>
            <SubWrapper>
                <CustomersInfo>
                    {" "}
                    Company: <Span>{data && data[0].name}</Span>
                </CustomersInfo>
                <CustomersInfo>
                    {" "}
                    OrganisationNr: <Span>{data && data[0].organisationNr}</Span>
                </CustomersInfo>
                <CustomersInfo>
                    {" "}
                    VatNr: <Span>{data && data[0].vatNr}</Span>
                </CustomersInfo>
                <CustomersInfo>
                    {" "}
                    Website: <Span>{data && data[0].website}</Span>
                </CustomersInfo>
                <CustomersInfo>
                    {" "}
                    Email: <Span>{data && data[0].email}</Span>
                </CustomersInfo>
                <CustomersInfo>
                    Reference: <Span>{data && data[0].reference}</Span>
                </CustomersInfo>
                <CustomersInfo>
                    PhoneNumber: <Span>{data && data[0].phoneNumber}</Span>
                </CustomersInfo>
                <CustomersInfo>
                    PaymentTerm: <Span>{data && data[0].paymentTerm}</Span>
                </CustomersInfo>
            </SubWrapper>
            <button onClick={Delete}>Delete</button>
        </DetailPageWrapper>
    )
}

export default DetailPage
