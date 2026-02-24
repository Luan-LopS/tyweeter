import * as  S from './style'
import { Follow } from "../../models/Follow"

type Porps =  {
    not_follow?: Follow[]
    onSubmitFollow: (data : {user_id: number})  =>  Promise<void>
}

const Explorar  = ({not_follow, onSubmitFollow}: Porps) =>{

    return(
        <S.Explorar>
            <h2>Seguir</h2>
                <S.Container>
                    {not_follow?.map(user => (
                        <S.Content key={user.id}>
                            <S.Detail>
                                <S.ImgPerfil src={user?.profile_picture} />
                                <h3>{user.name}</h3>
                                <p>{user.bio}</p>
                            </S.Detail>
                            <S.BtnSeguir type="submit"  value='Seguir' onClick={()=>onSubmitFollow({user_id: user.id})}/>
                        </S.Content>
                    ))}
                </S.Container>
                
        </S.Explorar>
    )
}



export default Explorar