import {AiOutlineCloseCircle} from 'react-icons/ai'
import {useState} from "react"
import InputComponent from "./InputComponent"
import {UserListItem} from "./UserListItem"
import {ChatState} from "../context/ChatProvider"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from "../animations/loading.json"
import Lottie from "lottie-react"
import {createPrivateChannel} from "../handlers/channel.handler"
import {findUsers} from "../handlers/user.handler"

export default function DrawerComponent({open, setOpen}){

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChannel, setLoadingChannel] = useState(false)

    const {setSelectedChannel, channels, setChannels} = ChatState()

    return (
        <section>
            <div className={`bg-slate-800 min-h-screen ${open ? "w-72" : "hidden"} duration-500 text-gray-100 p-4`}>
                {open && (<div className={"flex my-2 pb-2 justify-end"}>
                    <AiOutlineCloseCircle size={26} className={"cursor-pointer"} onClick={() => setOpen(!open)}/>
                </div>)}
                <div className={"my-2"}>
                    <h3 className={'flex text-xl font-semibold mt-2 p-2'}>Search by name or email</h3>
                    <div className={`flex flex-row items-center`}>

                        <InputComponent
                            label={""}
                            placeholder={"Search"}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className={"p-2 mt-2 cursor-pointer flex mx-1 font-semibold rounded-xl border-white border-2"}
                                onClick={() => findUsers(search,setLoading, setSearchResult)}>
                            Search
                        </button>
                    </div>

                    <div className={"mt-4 flex flex-col gap-4 relative"}>
                        {loading
                            ? (
                                <Skeleton count={6} baseColor={"#4b5563"} height={30} style={{marginBottom: '1.5rem'}}/>
                            ) : (
                                searchResult?.map((u) => (
                                    <UserListItem
                                        key={u._id}
                                        open={open}
                                        user={u}
                                        handleFunction={() => createPrivateChannel(u._id,{setLoadingChannel, setSelectedChannel, channels, setChannels, setSearch,setSearchResult, setOpen})}
                                    />
                                ))
                            )
                        }
                        {loadingChannel && <Lottie animationData={Loading} loop={true}/>}
                    </div>
                </div>
            </div>
        </section>
    )
}