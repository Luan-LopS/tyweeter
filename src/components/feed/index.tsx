import { Tweet } from '../../models/Tweet'
import  * as S  from './style'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { useState } from 'react'
import Comments from '../comment'
import { useNavigate } from 'react-router-dom'

type Props ={
    tweets?: Tweet[],
    btnLike: (data: {id: number, liked: boolean}) => Promise<void>
    btnComment: (data: {id_tweet: number, content: string}) => Promise<void>
    btnDeleteTweet: (data: {id: number}) => Promise<void>
    err: string
}

const Feed =({tweets, btnLike,  btnComment, btnDeleteTweet, err}: Props)=>{
    const currentUserId = useSelector((state: RootReducer)=> state.auth.currentUserId)
    const [actioncomment, setComment] = useState<number | null>(null)
    const nav = useNavigate() 

    const handleComments = (tweetId: number) =>{
        setComment(prev => prev === tweetId? null : tweetId)
    } 

    if(err)return <p>err</p>
    
    return(
        <S.Container>  
            <h2>Feed</h2>
            {tweets && (tweets.map((tweet) =>(
                <>
                    <S.Content key={tweet.id}>
                        <header>
                            <img src={tweet.user.profile_picture} alt=''/>
                            <S.ContentHeader>
                                <p>{tweet.user.username}</p>
                                {currentUserId && currentUserId === tweet.user.id && (
                                    <S.ContainerActions>
                                        <S.btnActions onClick={()=>nav(`/home/tweet/${tweet.id}`)}><i className="bi bi-pencil"></i></S.btnActions>
                                        <S.btnActions onClick={()=> btnDeleteTweet({id: tweet.id})}><i className="bi bi-trash"></i></S.btnActions>
                                    </S.ContainerActions>
                                )}
                            </S.ContentHeader>
                        </header>
                        <hr />
                        <p>{tweet.content}</p>
                        <br />
                        <hr />
                        <S.ContainerActions>
                            <S.btnActions onClick={()=> handleComments(tweet.id)}>{tweet.comment.length > 0 ? (
                                <S.ContainerLength>  
                                    Comentarios<S.Length>{tweet.comment.length}</S.Length>
                                </S.ContainerLength>
                            ): (
                                <>
                                    Comentar
                                </>
                            ) }</S.btnActions>
                            <S.btnActions onClick={()=> btnLike({id: tweet.id, liked: tweet.liked})}>{tweet.liked? (
                                <S.ContainerLength>  
                                    <i className="bi bi-hand-thumbs-up-fill  text-primery"></i>
                                </S.ContainerLength>
                            ):(
                                <>
                                    <i className="bi bi-hand-thumbs-up"></i>
                                </>
                            )}</S.btnActions>
                        </S.ContainerActions>
                    </S.Content>
                    <Comments btnComment={btnComment} tweetId={tweet.id} active={actioncomment === tweet.id}  comment={tweet.comment} />
                </>
            )))}
        </S.Container>
    )
}


export default Feed