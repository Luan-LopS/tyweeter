import styled from "styled-components"

export const ContainerFollow = styled.div`
    color: #fff;
    display:  grid;
    grid-template-columns: 1fr 1fr;

    ul{
        list-style: none;

        h2{
            margin-bottom: 38px;
        }
    }
`

export const ContentFollow =  styled.li`
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;


    img{
        width: 60px;
        height: 60px;
        display: block;
        margin: 20px auto;
        border-radius: 50%;
        border: 1px solid #fff;
        object-fit: cover;
    }
`