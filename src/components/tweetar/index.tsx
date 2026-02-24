import Btn from "../button"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { ContentTweetar, FormTwweet } from "./styled"
import { useGetTweetIdQuery } from "../../services/tweetServices"
import { useEffect } from "react"
import { skipToken } from "@reduxjs/toolkit/query"


type Props =  {
    onSubmitTweet: (data: {tweet: string})=> Promise<void>
    btnEditar: (data:{id: number,  content: string}) => Promise<void>
    id?: number
}


const Tweet  = ({onSubmitTweet,  btnEditar, id}: Props) => {
    const isEdit = Boolean(id)
    const {data: tweetData } =  useGetTweetIdQuery(id ?  Number(id) : skipToken)
    const form = useFormik({
        initialValues:{
            tweet: ''
        },
        validationSchema: Yup.object({
            tweet: Yup.string().min(5,'Mais  que 5 caracteres').required('Campo  obrigatorio')
        }),
        onSubmit: async (values,{ resetForm })=>{
            if(isEdit){
                await btnEditar({id: Number(id), content: values.tweet})
            }else{
            await onSubmitTweet(values)
            }
            resetForm()
        }
    })

    useEffect(()=>{
        if(tweetData){
            form.setValues({
                tweet:  tweetData.content
            })
        }
    },[tweetData])


    return(
        <ContentTweetar>
            <h2>Qual o Post de Hoje?</h2>
            <FormTwweet onSubmit={form.handleSubmit}>
                <textarea id="tweet"  placeholder="Tweet" value={form.values.tweet} onChange={form.handleChange}></textarea>
                <Btn text="Tweetar" action="submit" width="100"/>
            </FormTwweet>
        </ContentTweetar>
    )
}


export default Tweet