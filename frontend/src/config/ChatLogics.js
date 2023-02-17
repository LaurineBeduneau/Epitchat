export function getSender(loggedUser, users) {
    return users[0]._id === loggedUser._id ? users[1] : users[0]
}

export function isSameSender(messages, message, index, myId){
    return ( index < messages.length - 1
        && (messages[index + 1].sender._id === message.sender._id || messages[index + 1].sender._id === undefined)
        && messages[index].sender._id !== myId)
}

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length -1 &&
        messages[messages.length - 1 ].sender._id !== userId &&
        messages[messages.length - 1 ].sender._id
    )
}

export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        i < messages.length -1 &&
        messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 'ml-[33]'
    else if (
        (i < messages.length -1 &&
            messages[i+1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 'ml-0'
    else return 'ml-[auto]'
}

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i-1].sender._id === m.sender._id
}