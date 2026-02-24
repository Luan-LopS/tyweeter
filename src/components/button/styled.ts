import styled from "styled-components";

type props = {
    $width?: string
}


export const Buttom = styled.button<props>`
    cursor: pointer;
    width: ${({$width}) => $width ||  'auto'};
    background-color: #030303ff;
    color: #fff;
    border: none;
    padding: 6px;
    border-radius: 5px;
    margin-top: 16px;
`