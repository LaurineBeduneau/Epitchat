import SingleChat from "./SingleChat"
import {ChatState} from "../context/ChatProvider"

export default function ChatBox({ fetchAgain, setFetchAgain }){

    const {selectedChat} = ChatState()

    return (
        <div className={`items-center flex flex-col p-3 w-full rounded-xl ${selectedChat ? "flex" : "none"}`}>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    )
}