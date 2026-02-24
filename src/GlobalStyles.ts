import { createGlobalStyle } from "styled-components";
import styled from "styled-components";


export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}
`

export const TitleLog = styled.h2`
    text-align: center;
    text-transform: uppercase;
    color:#fff;
`

export const FormLog = styled.form`
    margin-top:16px;
    width: 500px;
`

export const InputLog = styled.input`
    width: 100%;
    margin-top: 8px;
    border-radius: 5px;
    padding: 6px
`


