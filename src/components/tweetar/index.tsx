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

const Tweet = ({ onSubmitTweet, btnEditar, id }: Props) => {
    const nav = useNavigate()
    const isEdit = Boolean(id)
    const [tweetLazy, { data: lazyTweet, isFetching }] = useLazyGetTweetIdQuery()

    if (isEdit && !lazyTweet && !isFetching) {
        tweetLazy(Number(id))
    }

    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            tweet: lazyTweet?.content || ''
        },
    validationSchema: Yup.object({
        tweet: Yup.string().min(5, 'Mais que 5 caracteres').required('Campo obrigatório')
    }),
    onSubmit: async (values) => {
        if (isEdit) {
            await btnEditar({ id: Number(id), content: values.tweet })
        } else {
            await onSubmitTweet(values)
        }
        form.setSubmitting(false)
        nav('/home')
        }
    })

    return (
        <ContentTweetar>
        <h2>Qual o Post de Hoje?</h2>
        <FormTwweet onSubmit={form.handleSubmit}>
        <textarea
            id="tweet"
            placeholder="Tweet"
            name="tweet"
            value={form.values.tweet}
            onChange={form.handleChange}/>
        <Btn text="Tweetar" action="submit" width="100" />
        </FormTwweet>
    </ContentTweetar>
    )}


export default Tweet