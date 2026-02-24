import Btn from "../../components/button"

const Tweet = () =>{



    return(
        <form>
            <input type="text"  placeholder="tweet" id="tweet"/>
            <Btn text="Publicar" ></Btn>
        </form>
    )
}

export default Tweet