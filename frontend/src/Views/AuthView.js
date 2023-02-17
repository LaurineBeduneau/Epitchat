import SignInForm from "../components/forms/SignInForm"
import SignUpForm from "../components/forms/SignUpForm"
import Logo from "../components/Logo"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

export default function AuthView() {
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'))
        if(user) navigate("/chats")
    },[navigate])

    return (
        <div className={"flex w-full h-screen"}>
            <div className={"w-full flex items-center justify-center lg:w-1/2"}>
                {isLogin
                    ? <SignInForm setIsLogin={setIsLogin}/>
                    : <SignUpForm setIsLogin={setIsLogin}/>
                }
            </div>
            <div className={"hidden lg:flex h-full w-1/2 items-center justify-center bg-gray-200"}>
                <div className={"w-80 h-80 bg-gradient-to-tr from-blue-700 to-pink-700 rounded-full animate-bounce drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"}>
                    <Logo/>
                </div>
            </div>
        </div>
    )
}