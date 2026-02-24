import React from "react"
import Btn from "../../components/button"
import { FormLog, InputLog, TitleLog } from '../../GlobalStyles'
import { useFormik } from "formik"
import * as Yup from 'yup'


type Props = {
    onSubmitLog: (data: {username: string, password: string}) => Promise<void>,
    err: string
}

const Login: React.FC<Props> = ({onSubmitLog, err}) =>{
    const form = useFormik({
        initialValues:{
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().min(5, 'Username precisa ter 5 caracteres')
            .required('O campo é obrigatorio'),
            password: Yup.string().required('O compo obrigatorio')
        }),
        onSubmit: async (values) =>{
            await onSubmitLog(values)
        }
    })

    return(
        <>
            <TitleLog>Login</TitleLog>
            <FormLog onSubmit={form.handleSubmit}>
                <InputLog id='username' type="text" placeholder="UserName" value={form.values.username} onChange={form.handleChange}/>

                <InputLog id="password" type="password" placeholder="Senha" value={form.values.password} onChange={form.handleChange}/>
                {err ? <p>{err}</p> : ''}
                <Btn action="submit" text={"Logar"} width="100%"/>
            </FormLog>
        </>
        
    )
}

export default Login