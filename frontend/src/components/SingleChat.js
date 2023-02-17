import {ChatState} from "../context/ChatProvider"
import {useEffect, useState} from "react"
import {getSender} from "../config/ChatLogics"
import InputComponent from "./InputComponent"
import ProfileModal from "./modals/ProfileModal"
import Axios from "../services/caller.service"
import {toast} from "react-hot-toast"
import UpdateGroupChatModal from "./modals/UpdateGroupChatModal"
import ScrollableChat from "./ScrollableChat";
import {HiOutlineArrowLeft} from "react-icons/hi"
import {errorHandler} from "../config/utils"

import io from "socket.io-client"
const URL = "http://localhost:8000"
let socket

export default function SingleChat({ fetchAgain, setFetchAgain }) {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")

    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const { selectedChannel, setSelectedChannel, user} = ChatState()
    async function fetchMessages(){
        if(!selectedChannel) return

        try {
            setLoading(true)

            const {data} = await Axios.get(`/api/messages/${selectedChannel._id}`)

            setMessages(data)
            setLoading(false)
        } catch (e) {
            errorHandler('Failed to load the messages',setLoading, e.message)
        }
    }

    useEffect(() => {
        socket = io(URL)

        socket.emit('setup', user)
        socket.on('connected', () => setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
    }, []);

    useEffect(() => {
        fetchMessages()
    }, [selectedChannel]);

    async function sendMessage(e) {
        if(e.key === "Enter" && newMessage){
            socket.emit("stop typing", selectedChannel._id)
            try {
                const message = {
                    content: newMessage,
                    channelId: selectedChannel._id,
                }
                const { data } = await Axios.post(`/api/messages`, message)

                setNewMessage('')
                setMessages([...messages, data])
                socket.emit('new message', data)
            } catch (e) {
                toast.error('Failed to send message')
            }
        }
    }

    function typingHandler(e){
        setNewMessage(e.target.value)
        if(!socketConnected) return
        if(!typing){
            setTyping(true)
            socket.emit('typing', selectedChannel._id)
        }

        let lastTypingTime = new Date().getTime()
        let timerLength = 3000
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChannel._id);
                setTyping(false);
            }
        }, timerLength)
    }

    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {
            setMessages([...messages, newMessageRecieved])

        })
    })


    return (
        <>
            {selectedChannel ? (
                <>
                    <h1 className={"p-2 m-2 w-full flex justify-between items-center border-b-2 rounded-xl"}>
                        <HiOutlineArrowLeft className={"cursor-pointer"} onClick={() => setSelectedChannel('')}/>
                        {messages && (
                            (!(selectedChannel.users.length > 2) && selectedChannel.channelName === 'sender')
                                ? (<>
                                    {getSender(user, selectedChannel.users).name}
                                    <ProfileModal
                                        user={getSender(user, selectedChannel.users)}
                                    />
                                </>)
                                : (<>
                                    {selectedChannel.channelName.toUpperCase()}
                                    <UpdateGroupChatModal
                                        fetchMessages={fetchMessages}
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                    />
                                </>)
                        )}
                    </h1>
                    <div className={"flex flex-col justify-end p-3 w-full h-full rounded-xl overflow-y-hidden"}>
                        {loading ? (
                            <h3>Loading . . . </h3>
                        ) : (
                            <div className={"flex flex-col "}>
                                <ScrollableChat messages={messages}/>
                            </div>
                        )}
                        <div>
                            <InputComponent
                                placeholder={"Enter a message.."}
                                value={newMessage}
                                onkeyDown={sendMessage}
                                onChange={typingHandler}
                            />
                        </div>
                    </div>
                </>
            ):(
                <div className={"flex items-center justify-center h-full"}>
                    <h3 className={"text-3xl pb-3"}>Click on a user to start chatting</h3>
                </div>
            )}
        </>
    )
}