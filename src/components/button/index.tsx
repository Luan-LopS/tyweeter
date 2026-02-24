import { Buttom } from "./styled"


type props={
    text: string,
    action?: 'submit' | 'button',
    width?: string,
    onClick?: void
}


const Btn = ({action='button', text, width}: props) => {

    return(
        <Buttom type={action} $width={width}>{text}</Buttom>
    )
}

export default Btn
