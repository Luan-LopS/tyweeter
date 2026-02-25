import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: #e5e7eb;

    h2{
        text-align: center;
        padding: 20px;
    }
`

export const Content = styled.div`
    width: 80%;
    list-style: none;
    background: #0f3077;
    border-radius: 12px  12px  0 0 ;
    padding: 12px;
    margin-top: 24px;

    header{
        height: 35px;
        display: flex;
        align-items: center;
        font-size: 12px;

        img{
            width: 35px;
            height: 100%;
            border-radius: 50%;
            background: #d9d9d9;
            margin-right: 12px;
        }
    }
`

export const ContentHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p{
        margin: 0;
    }
`

export  const ContainerActions  = styled.div`
    display: flex;
    justify-content: space-around;
`

export const trashAnsPencil = styled(ContainerActions)`
    width: 200px;
`

export const btnActions = styled.button`
    background: #0f3077;
    color:  #fff;
    border: none;
`

export const ContainerLength = styled.div`
    display: flex;
` 

export const Length = styled.span`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #161eff9f;
    display: block;
`;



