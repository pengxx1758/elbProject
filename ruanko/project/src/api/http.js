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

export function getLocationByName(city,address){
    let url = '/mapapi/geocoder'
    this.$http.get(url,{
      params:{
        city: city,
        address: address,
        output: 'json',
        key: 'MPz0YWb32SRcAbWPGE5CI8TBIOwjtAFF',
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
}