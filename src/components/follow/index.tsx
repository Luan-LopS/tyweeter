import { Relations } from "../../models/Follow"
import { ContainerFollow, ContentFollow } from "./styled"


type Props = {
    relations?: Relations,
    onSubmitUnfollow: (data : {user_id: number})  =>  Promise<void>

}

const Followings = ({relations, onSubmitUnfollow}: Props) =>{
    const following = relations?.following || []
    const followers = relations?.followers || []

    return(
        <ContainerFollow>  
            <ul>
                <h2>Seguindo</h2>
                {following?.map(relation => (
                    <ContentFollow  key={relation.id}>
                        <img src={relation.profile_picture} alt="" />
                        <h3>{relation.name}</h3>
                        <input type="submit"  value='Deixar de seguir' onClick={()=>onSubmitUnfollow({user_id: relation.id})}/>
                    </ContentFollow>
                ))}
            </ul>
            <ul>
                <h2>Seguindores</h2>
                {followers?.map(rel => (
                    <ContentFollow key={rel.id}>
                        <img src={rel.profile_picture} alt="" />
                        <h3>{rel.name}</h3>
                    </ContentFollow>
                ))}
            </ul>
        </ContainerFollow>
        
    )
}


export default Followings