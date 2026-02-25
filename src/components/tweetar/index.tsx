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
    console.log(id)

    const form = useFormik({
        initialValues:{
            tweet: ''
        },
        validationSchema: Yup.object({
            tweet: Yup.string().min(5,'Mais  que 5 caracteres').required('Campo  obrigatorio')
        }),
        onSubmit: async (values)=>{
            if(isEdit){
                await btnEditar({id: Number(id), content: values.tweet})
            }else{
                await onSubmitTweet(values)
            }
            form.setSubmitting(false)
            nav('/home')
        }
    })

    const handleTweet = (id: number) => {
            tweetLazy(id)
    }

    if (isEdit && lazyTweet && id) {
        handleTweet(id)  
    }

    if (lazyTweet && !form.values.tweet) {
        form.setValues({
            tweet: lazyTweet.content
        })
    }
    console.log(lazyTweet?.content)

    return(
        <ContentTweetar>
            <h2>Qual o Post de Hoje?</h2>
            <FormTwweet onSubmit={form.handleSubmit}>
                <textarea id="tweet"  placeholder="Tweet" name="tweet" value={form.values.tweet} onChange={form.handleChange}/>
                <Btn text="Tweetar" action="submit" width="100"/>
            </FormTwweet>
        </ContentTweetar>
    )
}


export default Tweet