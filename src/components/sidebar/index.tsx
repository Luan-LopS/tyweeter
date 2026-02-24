import { Link } from "react-router-dom"
import { ContainerSidebar } from "./styled"
import Logout from "../buttonLogout"

const Sidebar = () =>(
    <ContainerSidebar>
        <nav>
            <ul>
                <li><Link to="/home" >Home</Link></li>
                <li><Link to="/home/perfil" >Perfil</Link></li>
                <li><Link to="/home/follow">Seguir/Seguidores</Link></li>
                <li><Link to="/home/explorar" >Explorar</Link></li>
            </ul>
        </nav>
        <Link to="/home/tweet" className="btn btn-primary">Tweetar <i className="bi bi-rocket-takeoff-fill"></i></Link>

        <Logout / >
    </ContainerSidebar>
)



export default Sidebar