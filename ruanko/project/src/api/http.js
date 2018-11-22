import axios from 'axios';
const ENV = {
    test :"http://localhost:8081",
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

export function test(){
    return axios.post(now+"/listCategorytoJson")
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })
}