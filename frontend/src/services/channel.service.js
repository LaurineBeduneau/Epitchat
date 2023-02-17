import Axios from "./caller.service"

export async function setPrivateChannel(userId){
    return await Axios.post('api/channels',{userId})
}