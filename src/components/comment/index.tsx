import *  as Yup from "yup"
import { useFormik } from 'formik'
import { Comment } from "../../models/Tweet"
import *  as S from './styled'

type Porps = {
    active: boolean
    tweetId: number
    comment: Comment[]
    btnComment: (data: {id_tweet: number, content: string}) => Promise<void>
}


const Comments = ({active, tweetId, comment, btnComment}:  Porps) => {
    const form = useFormik({
            initialValues:{
                content: ''
            },
            validationSchema: Yup.object({
                content: Yup.string().trim()
            }),
            onSubmit: async (values)  =>{
                try{
                    await btnComment({
                        content: values.content,
                        id_tweet: Number(tweetId)
                    })
                    form.resetForm()
                }catch (erro){
                    form.setSubmitting(false)    
                }
            }
        })

    if (!active)return  null

    return(
        <S.CommentsContainer >
            <div>
                {tweetId && 
                (<form onSubmit={form.handleSubmit}>
                    <input id='content' name='content'  type="text" value={form.values.content} onChange={form.handleChange}/>
                    <button type='submit'>Commentar</button>
                </form>)}
                <ul>
                    {comment?.map((c)=>(
                        <li key={c.id}>
                            <header>
                                <span>{c.user}</span>
                                <hr />
                            </header>
                            <p>
                                {c.content}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            
        </S.CommentsContainer>
    )
}


export default Comments