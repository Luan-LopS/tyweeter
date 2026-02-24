import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../store/slice/loginCadastro"

const Logout = () => {
    const dispatch =  useDispatch()
    const  nav = useNavigate()

    const handleLogut =()=>{
        localStorage.removeItem('access')
        dispatch(logout())
        nav('/')
    }

    return(
        <>
            <button type='button' onClick={handleLogut}>Sair</button> 
        </>
    )
}


export default Logout