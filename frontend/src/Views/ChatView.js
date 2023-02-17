import {ChatState} from "../context/ChatProvider"
import DrawerComponent from "../components/DrawerComponent"
import {useState} from "react"
import HeaderComponent from "../components/HeaderComponent"
import MyChats from "../components/MyChats"
import ChatBox from "../components/Chatbox"

export default function ChatView() {

    const [fetchAgain, setFetchAgain] = useState(false)
    const [open, setOpen] = useState(false)
    const {user} = ChatState()

    return (
        <div className={"flex w-full h-screen"}>
            <div className={`${open ? "" : "hidden"} lg:flex`}>
                {user && (<DrawerComponent open={open} setOpen={setOpen}/>)}
            </div>
            <div className={"w-full"}>
                <div className={"h-[10%]"}>
                    {user && (<HeaderComponent open={open} setOpen={setOpen}/>)}
                </div>
                <section className={"flex mt-0.5 h-[89%] w-full"}>
                    <div className={"hidden relative lg:flex h-full w-1/4 bg-gray-200"}>
                        {user && (<MyChats fetchAgain={fetchAgain} />)}
                    </div>
                    <div className={"w-full flex lg:w-3/4"}>
                        {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
                    </div>
                </section>
            </div>
        </div>
    )
}