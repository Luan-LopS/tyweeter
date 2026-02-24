import styled from "styled-components"


export const CommentsContainer = styled.div`
    width: 80%;
    background: #0c255c; 
    border-radius: 0  0 12px  12px;
    padding-top: 24px;

    div{
        ul{
        list-style: none;
        padding: 16px;
        margin: 0;
        }

        li{
            background: #0f3077;
            border-radius: 8px;
            padding: 8px 12px;
            margin-bottom: 8px;
            font-size: 13px;
            display: flex;
            flex-direction: column;
        }

        header{
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            font-size: 12px;

            span{
                font-weight: 600;
                color: #fff;
            }
        }

        p{
            margin: 0;
            color: #e5e7eb;
            word-break: break-word;
        }

        form{
            margin-top: 12px;
            display: flex;
            gap: 8px;
            padding: 16px;

            input{
                flex: 1;
                padding: 6px 10px;
                border-radius: 8px;
                border: none;
                outline: none;
                background: #1c3b88;
                color: #fff;
            }

            button{
                background: #2563eb;
                color: #fff;
                border: none;
                border-radius: 8px;
                padding: 6px 12px;
                cursor: pointer;
                transition: 0.2s ease;

                &:hover{
                    background: #1d4ed8;
                }
            }
        }
    }
    
`