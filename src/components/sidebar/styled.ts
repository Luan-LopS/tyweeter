import styled from "styled-components";

export const ContainerSidebar = styled.aside`
    display:  flex;
    flex-direction: column;
    border-right: 1px solid #fff;
    width: 220px;
    height: 100vh;

    nav{
        padding: 40px 0;
    }

    

    li{
        list-style:  none;
        padding: 8px 0;
        
        a{
            text-decoration: none;
            color: #fff;
        }
    }
`

