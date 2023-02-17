import {toast} from "react-hot-toast"

export function errorHandler(message, callback, log = '') {
    toast.error(message)
    callback(false)
    log && console.log(log)
}

export const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
}