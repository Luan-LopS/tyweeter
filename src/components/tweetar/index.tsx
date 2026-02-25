import Btn from "../button"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { ContentTweetar, FormTwweet } from "./styled"
import { useLazyGetTweetIdQuery } from "../../services/tweetServices"
import { useNavigate } from "react-router-dom"


type Props =  {
    onSubmitTweet: (data: {tweet: string})=> Promise<void>
    btnEditar: (data:{id: number,  content: string}) => Promise<void>
    id?: number
}

const Tweet  = ({onSubmitTweet,  btnEditar, id}: Props) => {
    const nav = useNavigate()
    const [tweetLazy,{data: lazyTweet}] = useLazyGetTweetIdQuery()
    const isEdit = Boolean(id)

    if(isEdit && !lazyTweet){
        tweetLazy(Number(id))
    }
    
    const form = useFormik({
        enableReinitialize: true,
        initialValues:{
            tweet: ''
        },
        validationSchema: Yup.object({
            tweet: Yup.string().min(5,'Mais  que 5 caracteres').required('Campo  obrigatorio')
        }),
        onSubmit: async (values)=>{
            if(isEdit){
                await btnEditar({id: Number(id), content: values.tweet})
                nav('/home')
            }else{
                await onSubmitTweet(values)
                nav('/home')
            }
        }
    })


    if(isEdit &&  !form.values.tweet && lazyTweet){
        form.setValues({
            tweet: lazyTweet.content
        })
    }

    return(
        <ContentTweetar>
            <h2>Qual o Post de Hoje?</h2>
            <FormTwweet onSubmit={form.handleSubmit}>
                <textarea id="tweet"  placeholder="Tweet" name="tweet" value={form.values.tweet} onChange={form.handleChange}></textarea>
                <Btn text="Tweetar" action="submit" width="100"/>
            </FormTwweet>
        </ContentTweetar>
    )
}


export default Tweet