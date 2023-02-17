import {toast} from "react-hot-toast"
import {setPrivateChannel} from "../services/channel.service"

export async function createPrivateChannel(userId,options){
    const {setLoadingChannel, setSelectedChannel, channels, setChannels, setSearch,setSearchResult, setOpen} = options
    try{
        setLoadingChannel(true)

        const {data} = await setPrivateChannel(userId)

        if(!channels.find((channel) => channel._id === data._id)) setChannels([data, ...channels])

        setSelectedChannel(data)
        setLoadingChannel(false)
        setSearch('')
        setSearchResult([])
        setOpen(false)
    } catch (e) {
        // Message
        toast.error('Something went wrong while fetching the channel')
        setLoadingChannel(false)
    }
}