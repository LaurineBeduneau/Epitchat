import Axios from "./caller.service"

export async function signIn(credentials) {
    return await Axios.post("api/users/login", credentials)
}

export async function signUp(credentials) {
    return Axios.post("api/users", credentials)
}

export async function getUsers(search) {
    return Axios.get(`api/users?search=${search}`)
}