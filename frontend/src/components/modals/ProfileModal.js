import {useState} from "react"
import Modal from "react-modal"
import Avatar from "react-avatar"
import {customStyles} from "../../config/utils"
import {FiUser} from "react-icons/fi"


export default function ProfileModal({user, children}){

    const [openModal, setOpenModal] = useState(false)

    return (<>
        {children ? (
            <span onClick={()=>setOpenModal(!openModal)}>{children}</span>
        ):(
            <h2 className={"flex cursor-pointer"} onClick={()=>setOpenModal(!openModal)}><FiUser size={25}/></h2>
        )}

        <Modal
            isOpen={openModal}
            onRequestClose={()=>setOpenModal(false)}
            style={customStyles}>

            <div className={"m-2"}>
                <div className={"flex justify-center"}>
                    <h2 className={"text-2xl font-semibold mb-4"}>{user.name}</h2>
                </div>
                <div className={"flex flex-col items-center justify-between"}>
                    <Avatar
                        className="cursor-pointer mr-3"
                        size="60"
                        name={user.name}
                        src={user.pic}
                        round={true}/>

                    <h3 className={"flex flex-wrap w-full mt-2 mb-4"}>
                        Email: {user.email}
                    </h3>
                </div>
                <div className={"flex justify-center items-center my-2"}>
                    <button
                        className={"active:scale-[.98] active:duration-150 hover:scale-105 ease-in-out transition-all rounded-xl bg-gradient-to-tr from-blue-700 to-pink-700 text-white text-lg font-bold p-2"}
                        onClick={()=> setOpenModal(!openModal)}>
                        Close
                    </button>
                </div>
            </div>

        </Modal>
    </>)
}