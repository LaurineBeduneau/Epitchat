import {useState} from "react"
import {ChatState} from "../../context/ChatProvider"
import Modal from "react-modal"
import {toast} from "react-hot-toast"
import Axios from '../../services/caller.service'
import UserBadgeItem from "../UserBadgeItem"
import {UserListItem} from "../UserListItem"
import InputComponent from "../InputComponent"
import {customStyles} from "../../config/utils"
import {FiUsers} from "react-icons/fi"

export default function UpdateGroupChatModal({fetchMessages, fetchAgain, setFetchAgain}){

    const [openModal, setOpenModal] = useState(false)
    const [groupChannelName, setGroupChannelName] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const { selectedChannel, setSelectedChannel, user } = ChatState()

    async function handleRemove(user1) {

        if(selectedChannel.groupAdmin._id !== user._id && user1._id !== user._id){
            toast.error('Only admin can remove user')
            return
        }

        try {
            setLoading(true)

            const delUser = {
                channelId: selectedChannel._id,
                userId: user1._id
            }

            const {data} = await Axios.put('/api/channels/groupRemove', delUser)

            console.log(data)

            user1._id === user._id ? setSelectedChannel() : setSelectedChannel(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (e) {
            toast.error('Error while removing user')
            setLoading(false)
        }
    }

    async function handleAddUser(user1) {
        if(selectedChannel.users.find((u) => u._id === user1._id)){
            toast.error('User already in the group')
            return
        }

        if(selectedChannel.groupAdmin._id !== user._id){
            toast.error('Only admin user can add user')
            return
        }

        try {
            setLoading(true)

            const addUser = {
                channelId: selectedChannel._id,
                userId: user1._id
            }

            const {data} = await Axios.put('/api/channels/groupAdd', addUser)
            setSelectedChannel(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (e) {
            toast.error('Error while adding user')
            setLoading(false)
        }
    }

    async function handleSearch(query) {
        if (!query) return

        try {
            const {data} = await Axios.get(`/api/users?search=${query}`)
            setSearchResult(data)
            setLoading(false)
        } catch (e) {
            toast.error('Error while fetching users')
            setLoading(false)
        }
    }

    async function handleRename(){
        if(!groupChannelName) return

        try {
            setLoading(true)

            const updateChannel = {
                channelId: selectedChannel._id,
                channelName: groupChannelName
            }

            const {data} = await Axios.put(`/api/channels/rename`, updateChannel)
            console.log(data)
            setSelectedChannel(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (e) {
            toast.error('Error while renaming the channel')
            setLoading(false)
        }
    }

    return (
        <>
            <h2 className={"flex cursor-pointer"} onClick={()=>setOpenModal(!openModal)}><FiUsers size={25}/></h2>

            <Modal
                isOpen={openModal}
                onRequestClose={()=>setOpenModal(false)}
                style={customStyles}
            >
                <div className={"m-2"}>
                    <div className={"flex justify-center"}>
                        <h2 className={"text-2xl font-semibold mb-4"}>{selectedChannel.channelName}</h2>
                    </div>
                    <div className={"flex flex-wrap w-full "}>
                        {selectedChannel.users.map((u) => (
                            <UserBadgeItem
                                key={u._id}
                                user={u}
                                admin={selectedChannel.groupAdmin}
                                handleFunction={() => handleRemove(u)}
                            />
                        ))}
                    </div>
                    <div className={"flex justify-center items-center"}>
                        <InputComponent
                            label={"Channel name"}
                            type={"text"}
                            value={groupChannelName}
                            onChange={(e) => setGroupChannelName(e.target.value)}
                        />
                        <button
                            className={"active:scale-[.98] active:duration-150 hover:scale-105 ease-in-out transition-all rounded-xl bg-gradient-to-tr from-blue-700 to-pink-700 text-white text-lg font-bold mt-6 p-2"}
                            onClick={handleRename}>
                            Update
                        </button>
                    </div>
                    <div className={"flex justify-center items-center"}>
                        <InputComponent
                            placeholder={"Add user to group"}
                            type={"text"}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    {loading ? (
                        <div>Loading . . .</div>
                    ) : (
                        searchResult?.map((usr) => (
                            <UserListItem
                                key={usr._id}
                                user={usr}
                                handleFunction={() => handleAddUser(usr)}
                            />
                        ))
                    )}
                </div>
                <div className={"flex justify-center items-center my-2"}>
                    <button
                        className={"active:scale-[.98] active:duration-150 hover:scale-105 ease-in-out transition-all rounded-xl bg-gradient-to-tr from-blue-700 to-pink-700 text-white text-lg font-bold p-2"}
                        onClick={()=> handleRemove(user)}
                    >
                        Leave Group
                    </button>
                </div>
            </Modal>
        </>
    )
}