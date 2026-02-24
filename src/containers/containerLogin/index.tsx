import Login from "../../components/login"
import Cadastro from "../../components/cadastro"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useCadastroMutation, useLoginMutation } from "../../services/authServices"
import { useState } from "react"
import { Container, ContenLink, ContentLog, LinkLog } from "./styles"
import { User } from "../../models/User"
import { useLazyGetUserQuery } from "../../services/api"
import { setLogin } from "../../store/slice/loginCadastro"


const ContainerLogin = () =>{
    const [getUsder, {data: user }] =  useLazyGetUserQuery()
    
    const [login] = useLoginMutation();
    const [cadastro] = useCadastroMutation()

    const nav = useNavigate()
    const [getErrorLog, setErrorLog] = useState('')
    const [getErrorCadastro, setErrorCadastro] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const mode = location.pathname === '/cadastro' ? 'cadastro':'/'
    const handleSubmitLogin = async (data: {username: string, password: string})=>{
        try{
                const response = await login({
                    username: data.username,
                    password: data.password
                }).unwrap()

                localStorage.setItem('access', response.access)
                localStorage.setItem('refresh', response.refresh)
                const me =  await getUsder().unwrap()
                dispatch(setLogin({
                    isLogged:true,
                    userId: Number(me.id),
                    acess: response.access,
                    refresh: response.refresh}))
                nav('/home')
            }  catch (err) {
                setErrorLog('Usario ou senha invalido')
            }
    }

    const handleSubmitCadastro = async (data: User & {profile_picture?: File})=>{
        try{
            const formData = new FormData();
            formData.append('name', data.name)
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            if (data.bio) formData.append('bio', data.bio)
            if (data.profile_picture) formData.append('profile_picture', data.profile_picture)

            await cadastro(formData).unwrap()

            const cadastrado = await login({
                username: data.username,
                password: data.password
            }).unwrap()


            localStorage.setItem('access', cadastrado.access)
            localStorage.setItem('refresh', cadastrado.refresh)
            const me =  await getUsder().unwrap()
            dispatch(setLogin({
                isLogged:true,
                userId: Number(me.id), 
                acess: cadastrado.access,
                refresh:  cadastrado.refresh
            }))
            nav('/home')
        
        }catch(err){
            setErrorCadastro('Não foi possivel realizar o cadastro tente novamente')
        }
    }
    
    return(
        <Container>
            {mode === 'cadastro' ? (
                <ContentLog>
                    <Cadastro onSubimtCadastro={handleSubmitCadastro} err={getErrorCadastro}/>
                    <ContenLink>
                        <LinkLog to='/'>Logar</LinkLog>
                    </ContenLink>
                </ContentLog>
            ): (
                <ContentLog>
                    <Login onSubmitLog={handleSubmitLogin} err={getErrorLog}/>
                    <ContenLink>
                        <LinkLog to='/cadastro'>Cadastrar</LinkLog>
                    </ContenLink>
                </ContentLog>
            )}
        </Container>
    )
}


export default ContainerLogin



