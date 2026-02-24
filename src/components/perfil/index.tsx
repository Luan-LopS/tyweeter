
import * as S from "./style"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useGetUserQuery } from "../../services/api"


type Props = {
    onSubmitPerfil: (data:{name: string, bio?: string, profile_picture?: File, password: string})  => Promise<void>,
    err: string
}

const Perfil = ({err, onSubmitPerfil}: Props) =>{
    const { data: user, isLoading, isError } = useGetUserQuery()
    
    const form = useFormik({
        enableReinitialize: true,
        initialValues:{
            name:'',
            bio: '',
            password: '',
            profile_picture: undefined as File | undefined,
        },
        validationSchema: Yup.object({
            name: Yup.string().min(8,'Nome deve conter no minimo 8 caracteres'),
            bio: Yup.string(),
            password: Yup.string().min(8,'password deve conter no minimo 8 caracteres'),
            profile_picture: Yup.mixed(),
        }),
        onSubmit: async (values) =>{
            try{
                await onSubmitPerfil(values)
                form.setSubmitting(false)
                form.resetForm()
            }catch (erro){
                form.setSubmitting(false)
            }
        }
    })

    const getError = (text: keyof typeof form.values)=>{
        if(form.touched[text] && form.errors[text]){
            return form.errors[text]
        }
        return null
    }

    if(isError)return <p>Tentenovamente</p>
    if(isLoading) return <p>Carregando ...</p>
    if(err)return <p>{err}</p>

    return(
        <S.ContainerPerfil>
            <S.TitlePerfil>Perfil</S.TitlePerfil>
            <S.ImgPerfil src={user?.profile_picture} alt={user?.name} />
            <S.FormPerfil onSubmit={form.handleSubmit}>
                <S.InputPerfil id="name" type="text"  name="name" placeholder="name" value={form.values.name} onChange={form.handleChange}/>
                <small>{getError('name')}</small>
                <S.InputPerfil id="bio" type="text" name="bio" placeholder="bio" value={form.values.bio} onChange={form.handleChange} />
                <small>{getError('bio')}</small>
                <S.InputPerfil id="profile_picture" type="file" name="profile_picture" placeholder="Imagem"  onChange={(e)=>{
                    if(e.currentTarget.files && e.currentTarget.files[0]){
                        form.setFieldValue("profile_picture", e.currentTarget.files[0])}}}/>
                <S.InputPerfil id="password" type="password" name="password" placeholder="password" value={form.values.password} onChange={form.handleChange}/>
                <small>{getError('password')}</small>
                <S.BtnPerfil text="Atualizar" action="submit" width="100%"/>
            </S.FormPerfil> 
        </S.ContainerPerfil>
    )
}

export default Perfil




