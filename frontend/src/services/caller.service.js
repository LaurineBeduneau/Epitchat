import axios from "axios"


// Api Base URL
// initialisation d'Axios avec l'url par defaut
const Axios = axios.create({
    baseURL: "http://127.0.0.1:5000",
})

// Authorization check
// Interception de la requete pour y placer le token
Axios.interceptors.request.use((req) => {
    req.headers.setContentType("application/json")

    const userData = JSON.parse(localStorage.getItem("userData"))

    if(userData){
        req.headers.Authorization = `Bearer ${userData.token}`
    }

    return req
})

// Token validity check
// Interception de la reponse avec comme objectif de s'assurer que l'utilisateur a bien le droit de passer cette requete
// si oui continue si non doonnection forcer et redirection
Axios.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem("userData")
        }
    }
)

export default Axios