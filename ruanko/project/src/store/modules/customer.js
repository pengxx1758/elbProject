
const customer = {
    // state
    state: {
        isLogin: false,
        userId: '',    // 用户号
        username: null,   // 用户名
    },
    //getter
    getter: {
        // isLogin(){
        //     return state => state.isLogin;
        // }
    },

    // setter
    setter: {

    },

    // mutations
    mutations: {
        userStatus: (state,username) =>{
            if(username){
                state.username = username;
                state.isLogin = true;
            }else if(username == null){
                sessionStorage.setItem("username",null);
                state.username = null;
                state.isLogin = false;
            }
        },
        loginIn: state => {
            state.isLogin = true;
        },
        loginOut: state => {
            state.isLogin = false;
        }
    },

    // actions
    actions: {
        setUser: ({commit},username) => {
            commit("userStatus",username);
        },
    }
}

export default customer;