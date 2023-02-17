import {createContext, useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

const ChatContext = createContext()

const ChatProvider = ({children}) => {

    const [user, setUser] = useState()
    const [selectedChannel, setSelectedChannel] = useState()
    const [channels, setChannels] = useState()
    const [notification, setNotification] = useState([])

    const navigate = useNavigate()

    // AuthGuard - Making sure user is still logged in
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        setUser(userData)

        if(!userData) navigate("/")
    },[navigate])

    return(
        <ChatContext.Provider
            value={{
                user,
                setUser,
                channels,
                setChannels,
                selectedChannel,
                setSelectedChannel,
                notification,
                setNotification,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}
export default ChatProvider