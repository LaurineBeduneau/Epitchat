import {useState} from "react"

export default function InputComponent({label, type, placeholder, value, onChange, onkeyDown = () => {}}) {

    const [hide, setHide] = useState(true)

    return (
        <div className={"m-2"}>
            <label className={'text-lg font-medium'}>{label}</label>
            <div className={"flex flex-row items-center justify-center mt-2"}>
                <input
                    type={hide ? type : "text"}
                    className={'w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onkeyDown}
                />
                { type === 'password' && (
                    <i className={"cursor-pointer p-4 flex items-center justify-center border-2 rounded-xl mx-2"} onClick={() => setHide(!hide)}>
                        {hide ? "Show" : "Hide"}
                    </i>)
                }
            </div>

        </div>
    )
}