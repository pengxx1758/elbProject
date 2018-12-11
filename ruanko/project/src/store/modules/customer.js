
const customer = {
    // state
    state: {
        isLogin: false,
        userId: '',    // 用户号
        username: "",   // 用户名
        tel: '',         // 用户手机
        vip: false,        // 是否是Vip
    },
    //getter
    getter: {
        
    },

    // setter
    setter: {

    },

    // mutations
    mutations: {
        loginIn: state => {
            state.isLogin = true;
        },
        loginOut: state => {
            state.isLogin = false;
        }
    },

    // actions
    actions: {

    }
}

export default customer;