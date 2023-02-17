import {useState} from "react"

import InputComponent from "../InputComponent"

import Lottie from "lottie-react"
import Loading from "../../animations/loading.json"
import {submitSignIn} from "../../handlers/user.handler"
import {useNavigate} from "react-router-dom"

function SignInForm({setIsLogin}) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    return (
        <div className={"bg-white p-10 rounded-3xl border-gray-200 border-2 hover:shadow-gray-700 hover:shadow-2xl"}>
            <h1 className={'text-5xl font-semibold mb-4'}>Sign In</h1>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className={'mt-4'}>
                    <InputComponent
                        label={"Username"}
                        type={"text"}
                        placeholder={"Enter your Username"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputComponent
                        label={"Email"}
                        type={"email"}
                        placeholder={"Enter your email address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputComponent
                        label={"Password"}
                        type={"password"}
                        placeholder={"Enter your password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={"mt-8 flex flex-col gap-y-4"}>
                        {loading
                            ? (<button className={"flex justify-center items-center rounded-xl border-2"}>
                                <div className={"w-14"}>
                                    <Lottie animationData={Loading} loop={true}/>
                                </div>
                            </button>)
                            : (<button
                                className={"active:scale-[.98] active:duration-150 hover:scale-105 ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-blue-700 to-pink-700 text-white text-lg font-bold"}
                                type={"submit"}
                                onClick={() => submitSignIn({name, email, password}, setLoading, navigate)}>
                                Sign in
                            </button>)
                        }
                    </div>
                    <div className={"mt-8 flex justify-center items-center"}>
                        <p className={"font-medium text-base"}>Don't have an account ?</p>
                        <button onClick={() => {setIsLogin(false)}} className={"text-violet-500 text-base font-medium ml-2"}>
                            Sign up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInForm