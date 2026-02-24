import { useOutletContext, useParams } from 'react-router-dom';
import Tweet from '../tweetar';

const TweetWrapper = () => {
    const { onSubmitTweet, btnEditar} = useOutletContext<{
    onSubmitTweet: (data: {tweet: string}) => Promise<void>
    btnEditar: (data:{id:number, content:string}) => Promise<void>}>()

    const { id } = useParams()
    return <Tweet onSubmitTweet={onSubmitTweet} btnEditar={btnEditar} id={Number(id)}/>
}


export default TweetWrapper