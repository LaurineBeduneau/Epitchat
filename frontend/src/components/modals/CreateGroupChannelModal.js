import {useState} from "react"
import {ChatState} from "../../context/ChatProvider"
import Modal from 'react-modal'
import InputComponent from "../InputComponent"
import {toast} from "react-hot-toast"
import Axios from "../../services/caller.service"
import {UserListItem} from "../UserListItem"
import {customStyles} from "../../config/utils"
import Avatar from "react-avatar"
import {findUsers} from "../../handlers/user.handler"

export default function CreateGroupChannelModal({children}) {

    const [openModal, setOpenModal] = useState(false)
    const [groupChannelName, setGroupChannelName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const {channels, setChannels} = ChatState()

    async function handleGroup(userToAdd) {
        if(selectedUsers.includes(userToAdd)){
            toast.error('User already added')
            return
        }
        setSelectedUsers([...selectedUsers, userToAdd])
    }

    function handleDelete(delUser) {
        setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id))
    }

    async function handleSubmit() {
        if(!groupChannelName || !selectedUsers){
            toast.error('Please fill all the fields')
            return
        }

        try {

            const group = {
                name: groupChannelName,
                users: JSON.stringify(selectedUsers.map((u) => u._id))
            }

            const { data} = await Axios.post('/api/channels/group',group)

            setChannels([data, ...channels])
            setOpenModal(!openModal)
            toast.success('Group was successfully created')
        } catch (e) {
            toast.error('Failed to create the group channel')
            toast.error(e.message)
        }
    }

    return (
        <>
            <span className={"cursor-pointer flex flex-row w-full justify-center  items-center border-b-2 border-t-2 border-gray-400 rounded-lg hover:text-white hover:bg-cyan-500"}
                  onClick={()=>setOpenModal(!openModal)}>{children}</span>

            <Modal
                isOpen={openModal}
                onRequestClose={()=>setOpenModal(false)}
                style={customStyles}
            >
                <div className={"flex justify-center"}>
                    <h2 className={"text-2xl font-semibold mb-4"}>Create Group Channel</h2>
                </div>
                <div className={"flex my-2 flex-col"}>
                    <>
                        <InputComponent
                            label={"Channel name"}
                            type={"text"}
                            placeholder={"Enter the channel name"}
                            value={groupChannelName}
                            onChange={(e) => setGroupChannelName(e.target.value)}
                        />
                        <InputComponent
                            label={"Add users to group"}
                            type={"text"}
                            placeholder={"Add Users eg: John, Jane"}
                            onChange={(e) => findUsers(e.target.value,setLoading,setSearchResult)}
                        />
                    </>

                    <div className={"flex flex-row gap-3 my-2 overflow-x-auto w-80"}>
                        {selectedUsers.map((u) => (
                            <Avatar
                                size={60}
                                key={u.id}
                                name={u.name}
                                round={true}
                                onClick={() => handleDelete(u)}
                            />
                        ))}
                    </div>
                    {loading ? (
                        <div>Loading . . .</div>
                    ) : (
                        searchResult?.slice(0,6).map((usr) => (
                            <UserListItem
                                key={usr._id}
                                user={usr}
                                handleFunction={() => handleGroup(usr)}
                            />
                        ))
                    )}
                </div>
                <div className={"flex justify-center items-center my-2"}>
                    <button
                        className={"active:scale-[.98] active:duration-150 hover:scale-105 ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-blue-700 to-pink-700 text-white text-lg font-bold p-2"}
                        onClick={handleSubmit}
                    >
                        Create Group
                    </button>
                </div>
            </Modal>
        </>
    )
}