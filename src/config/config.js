const MIN_TASK_LENGTH = 3;
const SECONDS_IN_DAY = 86400;


export default {
    appName:"MyTodo",
    logoImg: "http://jhsdigital.weebly.com/uploads/1/2/7/2/12727281/8706388_orig.jpg",
    
    User : {

        userNameInClientDb: "userinfo",
        fetchUrl: 'https://randomuser.me/api/',
        fetchParams: {
            nat: "fr",
            inc: "id,gender,name,email,picture,nat",
            seed: "helloworld",
            noinfo: true
        },
        session: {
            shouldExpire: true,
            timeout: SECONDS_IN_DAY
        },
        msg : {
            LOGOUT_WHEN_NOT_LOGGED_IN : "You are trying to log out but you are not even loggedIn",
            USER_NO_MATCH: "No user matched for this name...",
            LOGIN_NOT_AUTO: "Le client ne se connecte pas automatiquement",
        },
    },
        
    Todo: {
        MIN_TASK_LENGTH,
        msg:  {
            TASK_IS_TOO_SHORT: "Enter a task longer than "+ MIN_TASK_LENGTH,
            TASK_ALREADY_EXIST: "This task has already been created",
            TASK_INEXISTANT: "this id doesn't match any task",

        },
        status: {
            ALERT: "alert",
            WARNING: "warning",
            OK: "ok"
        }

    },
    SECONDS_IN_DAY
}