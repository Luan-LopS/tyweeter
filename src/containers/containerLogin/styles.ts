import { Link } from "react-router-dom"
import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const ContentLog = styled.div`
    padding: 40px 20px;
    border-radius: 30px;
    border: 1px solid #000;
    box-shadow: 5px 10px 20px #000;

    p{
        width:100%;
        margin-top:6px;
        font-size:12px;
        text-align: center;
        color: red;
    }
`


export const LinkLog = styled(Link)`
    color: #fff;
    margin-top: 8px;
    position: relative;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    width:  100%;
    text-align: center;
`

export const ContenLink = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`