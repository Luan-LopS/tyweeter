import React from "react"
import { FormLog, InputLog, TitleLog } from "../../GlobalStyles"
import Btn from "../button"
import { useFormik } from "formik"
import * as Yup from 'yup'


type Props = {
    onSubimtCadastro: (data:{name: string, username: string, email: string, bio?: string, profile_picture?: File, password: string})  => Promise<void>,
    err: string
}


const Cadastro: React.FC<Props> = ({err, onSubimtCadastro}) =>{
    const form = useFormik({
        initialValues:{
            name: '',
            username: '',
            email: '',
            bio: '',
            password: '',
            profile_picture: undefined,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Campo obrigatorio').min(8,'Nome deve conter no minimo 8 caracteres'),
            username: Yup.string().required('Campo obrigatorio').min(8,'username deve conter no minimo 8 caracteres'),
            email: Yup.string().email('E-mail inválido').required('Campo obrigatorio'),
            bio: Yup.string(),
            password: Yup.string().required('Campo obrigatorio').min(8,'password deve conter no minimo 8 caracteres'),
            profile_picture: Yup.mixed(),
        }),
        onSubmit: async (values) =>{
            await onSubimtCadastro(values)
        }
    })

    const getError = (text: keyof typeof form.values)=>{
        if(form.touched[text] && form.errors[text]){
            return form.errors[text]
        }
        return null
    }


    return(
        <>
            <TitleLog>Cadastro</TitleLog>
            <FormLog onSubmit={form.handleSubmit}>
                <InputLog id="name" type="text"  name="name" placeholder="name" value={form.values.name} onChange={form.handleChange}/>
                <small>{getError('name')}</small>
                <InputLog id="username" type="text" name="username" placeholder="username" value={form.values.username} onChange={form.handleChange}/>
                <small>{getError('username')}</small>
                <InputLog id="email" type="email" name="email" placeholder="Email" value={form.values.email} onChange={form.handleChange} />
                <small>{getError('email')}</small>
                <InputLog id="bio" type="text" name="bio" placeholder="bio" value={form.values.bio} onChange={form.handleChange} />
                <small>{getError('bio')}</small>
                <InputLog id="profile_picture" type="file" name="profile" placeholder="Imagem"  onChange={(e)=>{
                    if(e.currentTarget.files && e.currentTarget.files[0]){
                        form.setFieldValue("profile_picture", e.currentTarget.files[0])}}}/>
                <small>{getError('profile_picture')}</small>
                <InputLog id="password" type="password" name="password" placeholder="password" value={form.values.password} onChange={form.handleChange}/>
                <small>{getError('password')}</small>
                <Btn text="Cadastrar" action="submit" width="100%"/>
            </FormLog> 
        </>
    )
}

export default Cadastro