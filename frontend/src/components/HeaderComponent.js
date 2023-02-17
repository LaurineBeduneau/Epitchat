import Avatar from "react-avatar"
import {ChatState} from "../context/ChatProvider"
import {useNavigate} from "react-router-dom"
import {FiSearch} from 'react-icons/fi'

import Logo from "./Logo"
import {logoutHandler} from "../handlers/user.handler"

export default function HeaderComponent({open, setOpen}) {
    const {user} = ChatState()
    const navigate = useNavigate()

    return (
        <div className={"flex justify-between items-center w-full p-2 border-b-2"}>
            <button
            className={"flex border-2 border-gray-400 p-4 items-center rounded-xl gap-2 p-2"}
                onClick={() => setOpen(!open)}>
                <FiSearch/>
                <h3 className={"text-base font-semibold"}>Search User</h3>
            </button>
            <div className={"items-center justify-center"}>
                <div className={"w-20 h-20 bg-gradient-to-tr from-blue-700 to-pink-700 rounded-full"}>
                    <Logo/>
                </div>
            </div>
            <div className={"flex justify-center items-center hover:border-2 rounded-xl p-2 m-0.5 cursor-pointer mx-4 px-2"}>
                <Avatar
                    size="60"
                    name={user.name}
                    src={user.pic}
                    round={true}
                    onClick={() => {logoutHandler(navigate)}}
                />
            </div>
        </div>
    )
}