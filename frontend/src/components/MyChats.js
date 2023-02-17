import {ChatState} from "../context/ChatProvider"
import {useEffect} from "react"
import Axios from "../services/caller.service"
import {getSender} from "../config/ChatLogics"
import {toast} from "react-hot-toast"
import CreateGroupChannelModal from "./modals/CreateGroupChannelModal"
import {IoAddOutline} from 'react-icons/io5'

export default function MyChats({fetchAgain}) {
    const {selectedChannel, setSelectedChannel, user, channels, setChannels} = ChatState()

    async function fetchChannels() {
        try{
            const {data} = await Axios.get('/api/channels')
            setChannels(data)
        } catch (err) {
            // Message
            toast.error('Failed to fetch channels')
        }
    }

    useEffect(() => {fetchChannels()}, [fetchAgain])

    return (
        // a modifier flex state et width
        <div className={"flex flex-col items-center p-3 rounded-lg w-full"}>
                <CreateGroupChannelModal>
                    <div className={"flex flex-row pb-3 p-3 gap-3.5 "}>
                        <IoAddOutline size={25}/>
                            New channel
                    </div>
                </CreateGroupChannelModal>

            <div className={"flex flex-col p-3 w-full h-full rounded-lg overflow-y-hidden"}>
                {channels ? (
                    <div className={"overscroll-auto"}>
                        {channels.map((channel) => (
                            <div
                                key={channel._id}
                                className={`cursor-pointer px-3 py-2 rounded-xl hover:bg-cyan-400 hover:text-white ${selectedChannel === channel ? "bg-cyan-500 text-white" : "bg-[#E8E8E8] text-black"}`}
                                onClick={() => setSelectedChannel(channel)}
                            >
                                <h3>
                                    { channel.users.length === 2 && channel.channelName === 'sender'
                                        ? getSender(user, channel.users).name
                                        : channel.channelName
                                    }
                                </h3>
                                {
                                    channel.lastMessage &&
                                    (<p className={"text-base"}>
                                        <b>{channel.lastMessage.sender.name} : </b>
                                        {
                                            channel.lastMessage.content.length > 50
                                                ? channel.lastMessage.content.substring(0,51) + '...'
                                                : channel.lastMessage.content
                                        }
                                    </p>)
                                }
                            </div>
                        ))}
                    </div>

                ) : (<></>)}
            </div>
        </div>
    )
}