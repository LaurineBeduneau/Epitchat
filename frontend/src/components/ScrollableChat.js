import {ChatState} from "../context/ChatProvider"
import ScrollToBottom from 'react-scroll-to-bottom'
import {isLastMessage, isSameSender, isSameSenderMargin, isSameUser} from "../config/ChatLogics"
import Avatar from "react-avatar"

export default function ScrollableChat({messages}){
    const {user} = ChatState()

    return (
        <ScrollToBottom>
            {messages && messages.map((message, index) => (
               <div
                   className={"flex"}
                   key={message._id}>
                   {(isSameSender(messages, message, index, user._id) ||
                       isLastMessage(messages, index, user._id)) && (
                       <Avatar
                           style={{'marginTop': '7px', 'marginRight': '3px'}}
                           alt={message.sender.name}
                           size={40}
                           name={message.sender.name}
                           src={message.sender.pic}
                           round={true}
                       />
                   )}
                   {<span className={`rounded-xl p-2 max-w-3xl ${
                       message.sender._id === user._id ? "bg-[#BEE3F8]" : "bg-[#B9F5D0]"}
                       ${isSameSenderMargin(messages, message, index, user._id)}
                       ${isSameUser(messages, message, index, user._id) ? 'mt-3' : 'mt-10'}
                       `}>
                       {message.content}
                   </span>}
               </div>
            ))}
        </ScrollToBottom>
    )
}