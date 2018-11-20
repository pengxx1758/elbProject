import axios from 'axios'

const ENV = {
    test :"http://localhost:3000",
    dev : "",
    pro : ""
}
const now = ENV.test;

export function login(userInfo){
    return axios.post(now+"/login",{
        params: {
            username: userInfo.name,
            password: userInfo.password
        }
    })
}