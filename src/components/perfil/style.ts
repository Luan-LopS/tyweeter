import styled from "styled-components";
import Btn from "../button";

export const ContainerPerfil = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-top: 16px; 
`

export const TitlePerfil = styled.h2`
    text-align: center;
    color:  #fff;
`

export const ImgPerfil = styled.img`
    width: 60px;
    height: 60px;
    display: block;
    margin: 20px auto;
    border-radius: 50%;
    border: 1px solid #fff;
    object-fit: cover;
`

export const FormPerfil = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
`

export const InputPerfil = styled.input`
    width: 100%;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #6c63ff;
    }
`

export const BtnPerfil = styled(Btn)`
    background-color: #6c63ff;
    color: white; 

    &:hover {
    background-color: #5a52e2; 
    }
`