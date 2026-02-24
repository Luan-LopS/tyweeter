import styled from "styled-components";

export const  Explorar = styled.div`
    width: 100%;
    color: #e5e7eb;
    display:  flex;
    flex-direction: column;

    h2{
        text-align: center;
        padding: 20px;
    }
`

export const Container = styled.div`
    height: 100%;
    color: #e5e7eb;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
`

export const Content = styled.div`
    list-style: none;
    background: #111827;
    border-radius: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;

    h3{
        font-size: 24px;
        margin-bottom:  8px;
    }
`

export const Detail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ImgPerfil = styled.img`
    width: 60px;
    height: 60px;
    display: block;
    margin: 14px auto;
    border-radius: 50%;
    border: 1px solid #fff;
    object-fit: cover;
`

export const BtnSeguir = styled.input`
    width: 100%;
    border-radius:  8px;
`


