import {setName} from "@/util/auth";
import {login} from "@/api/http";

// initial state
// shape: [{ id, quantity }]
const state = {
    userName: ""
}
  
// getters
const getters = {
    name:state=>state.userName,
}
// mutations
const mutations = {
    setUserName: (state,{userName}) => {
        state.userName = userName
    },
}
// actions
const actions = {
    // 登录
    Login({ commit }, userInfo) {
        login(userInfo).then(function (response) {
            const data = response.data;
            console.log(response.data.params.username)
            commit('setUserName', data.params.username);
            setName(data.params.username)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}



export default {
namespaced: true,
state,
getters,
actions,
mutations
}