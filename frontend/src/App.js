import {Route, Routes} from "react-router-dom"
import AuthView from './Views/AuthView'
import ChatView from './Views/ChatView'
import {Toaster} from "react-hot-toast"

export default function App() {
    return (
        <div className={"App h-[100vh]"}>
            <Routes>
                <Route path={'/'} element={<AuthView/>}/>
                <Route path={'/chats'} element={<ChatView/>}/>
            </Routes>
            <Toaster position={"bottom-center"} reverseOrder={true} toastOptions={{duration:5000}}/>
        </div>
    )
}