import { useDeletTweetMutation, useEditTweetMutation, useGetTweetsQuery, usePostTweetMutation } from "../../services/tweetServices"
import Sidebar from "../../components/sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { useState } from "react"
import * as S from "./styled"
import { useUpdateUserMutation } from "../../services/api"
import Perfil from "../../components/perfil"
import Feed from "../../components/feed"
import Explorar from "../../components/explorar"
import Followings from "../../components/follow"
import { useGetFollowersQuery, useGetRelationsQuery, useSendFollowMutation, useUnfollowMutation } from "../../services/followServices"
import { usePostLikeMutation } from "../../services/likeService"
import { usePostCommentsMutation } from "../../services/commentServices"


const ContainerHome = () =>{
    const local = useLocation()
    const showPerfil  = local.pathname === '/home/perfil'
    const showFeed =  local.pathname === '/home'
    const showUsers = local.pathname === '/home/explorar'
    const showFollow = local.pathname ==='/home/follow'

    //get dados
    const {data:  tweets, isLoading, error} = useGetTweetsQuery(undefined,{pollingInterval: 2500})
    const {data: users } =  useGetFollowersQuery(undefined,{pollingInterval: 10000})
    const {data: relations } = useGetRelationsQuery()

    //post dados
    const [postTweet] = usePostTweetMutation()
    const [UpdateUser] = useUpdateUserMutation()
    const [sendFollow] = useSendFollowMutation()
    const [unFollow] = useUnfollowMutation()
    const [postLike] = usePostLikeMutation()
    const [commentPost] = usePostCommentsMutation()
    const [deletPost] = useDeletTweetMutation()
    const [editTweet] = useEditTweetMutation()

    //states
    const [getErrorTweet, setErrorTweet]  = useState('')
    const [getErrorPerfil,  setErrorPerfil] = useState('')

    const handleSubmitTweet = async (data: { tweet: string})=>{
        try{
            await postTweet({
                content: data.tweet
            }).unwrap()
        }catch(err){
            setErrorTweet('Não foi possivel realizar o tweet')
        }
    }

    const handleDeletTweet = async (data: { id: number})=>{
        try{
            await deletPost({
                id: data.id
            }).unwrap()
        }catch(err){
            setErrorTweet('Não foi possivel deletar o tweet')
        }
    }

    const handleEditTweet =  async (data: { id: number, content: string}) =>{
        try{
            await editTweet(data).unwrap()
        }catch(err){
            setErrorTweet('Não foi possivel editar')
        }
    }

    const handleSubmitPerfil = async (data: {name: string, bio?: string, profile_picture?: File, password: string })=>{
        try{
            const formData = new FormData()
            if (data.name) formData.append('name', data.name)
            if (data.bio) formData.append('bio', data.bio)
            if (data.profile_picture) formData.append('profile_picture', data.profile_picture)
            if (data.password)formData.append('password', data.password)

            await UpdateUser(formData).unwrap()
        }catch(err){
                setErrorPerfil('Não foi possivel atulizar tenta novamente')
        }
    }

    const handleSubmitFollow = async (data: {user_id: number})=>{
        try{
            await sendFollow({
                user_id: data.user_id
            }).unwrap()
        } catch (err){
            console.log(err)
        }
    }

    const handleUnfollow = async(data: {user_id: number}) => {
        try{
            await unFollow({
                user_id: data.user_id
            }).unwrap()
        }catch (error){
            console.log(error)
        }
    }

    const handleLike = async (data: {id: number, liked: boolean})  =>{
        try{
            if (data){
                await postLike({
                    id: data.id,
                    liked: !data.liked   
            }).unwrap() }   
        }catch(err){
            console.log(err)
        }
    }

    const handleComments = async (data: {id_tweet: number, content: string}) => {
        try{
            await commentPost({
                content: data.content,
                id_tweet: data.id_tweet
            }).unwrap()
        }catch(erro){
            console.log(erro)
        }
    }

    if (isLoading) return <p>Carregando</p>
    if(error) return <p>Tentenovamente</p>

    return(
        <S.CtnHome className="container-fuild">
            <S.SideMain>
                <Sidebar/>
            </S.SideMain>
            <S.Main>
                {showFeed && <Feed tweets={tweets} btnLike={handleLike} btnComment={handleComments} btnDeleteTweet={handleDeletTweet} err={getErrorTweet}/>}
                {showPerfil && <Perfil onSubmitPerfil={handleSubmitPerfil} err={getErrorPerfil} />}
                {showUsers && < Explorar not_follow={users} onSubmitFollow={handleSubmitFollow}/>}
                {showFollow && < Followings relations={relations} onSubmitUnfollow={handleUnfollow} /> }
                <Outlet context={{ tweets: tweets, onSubmitTweet: handleSubmitTweet, btnEditar: handleEditTweet,}} />
            </S.Main>
        </S.CtnHome>
    )
}

export default ContainerHome