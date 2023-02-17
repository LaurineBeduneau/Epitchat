import {errorHandler} from "../config/utils"
import {getUsers, signIn, signUp} from "../services/user.service"
import {toast} from "react-hot-toast"


export async function submitSignIn(credentials, setLoading, navigate){
    setLoading(true)

    if(!credentials.name) {
        errorHandler("Please fill the required fields",setLoading)
        return
    }

    try {
        const {data} = await signIn( credentials )
        toast.success('Login Successfully')
        localStorage.setItem("userData", JSON.stringify(data))
        setLoading(false)
        navigate('/chats')
    } catch (err) {
        errorHandler('User not found',setLoading, err.message)
    }
}

export async function submitSignUp(credentials, setLoading, navigate){
    const {name, email, password, confirmPassword} = credentials
    setLoading(true)

    if(!name) {
        errorHandler("Please fill the required fields", setLoading)
        return
    }

    if( password && password !== confirmPassword){
        errorHandler('Passwords do not match', setLoading)
        return
    }

    try {
        const {data} = await signUp({name, email, password})
        toast.success('Registration successful')
        localStorage.setItem("userData", JSON.stringify(data))
        setLoading(false)
        navigate('/chats')
    } catch (err) {
        errorHandler('Something went wrong', setLoading, err.message)
    }
}

export function logoutHandler(navigate) {
    localStorage.removeItem("userData")
    navigate('/')
}

export async function findUsers(search, setLoading, setSearchResult) {

    setLoading(true)
    if(!search) {
        errorHandler('Please enter a search term',setLoading)
        return
    }

    try {
        const {data} = await getUsers(search)
        setLoading(false)
        setSearchResult(data)
    } catch (err) {
        errorHandler('Failed to load search results', setLoading,err.message)
    }
}