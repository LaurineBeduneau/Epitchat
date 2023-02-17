import logo from '../assets/Epichat.svg'
import {useNavigate} from "react-router-dom"
import {ChatState} from "../context/ChatProvider"

export default function Logo({size}) {
    const navigate = useNavigate()

    const {user} = ChatState()
    function onClick() {
        (user) ? navigate("/chats") : navigate("/")
    }

    return (
        <img className={"cursor-pointer"} src={logo} alt="EpiChat" onClick={onClick} />
    )
}