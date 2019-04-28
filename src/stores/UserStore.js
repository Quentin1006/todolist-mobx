import { observable, computed, action } from "mobx";

import clientDb from "../services/clientDb";
import config from "../config";

const { User } = config;
const { userNameInClientDb, session } = User;
const { shouldExpire, timeout } = session;

class UserStore {
    rootStore;
    httpService;
    userNameInClientDb = "userinfo";
    timeout = timeout;

    @observable isLoggedIn = false;
    @observable isLoading = false;
    @observable autoConnect = false;
    @observable rememberme = false;
    @observable lastConnection = 0;

    @observable.struct userinfo = {
        id:{},
        gender: "",
        name: {
            title: "",
            first:"",
            last:""
        },
        email: "",
        picture:{},
        nat: ""
    };


    constructor(rootStore, httpService){
        this.rootStore = rootStore;
        this.httpService = httpService;
    }

    
    @computed
    get firstName(){
        const name = this.userinfo && this.userinfo.name;
        return name && name.first;
    } 


    @computed
    get userId(){
        const id = this.userinfo && this.userinfo.id;
        return  id && id.value;
    }


    @computed
    get sessionIsExpired(){
        if(shouldExpire){
            return Date.now() - (this.lastConnection + this.timeout) > 0;
        }
        return false;
    }



    @action.bound
    toggleAutoConnect = () => {
        this.autoConnect = !this.autoConnect;
        return this.autoConnect;
    }

    
    @action.bound
    toggleRememberme = () => {
        this.rememberme = !this.rememberme;
        return this.rememberme;
    }


    @action.bound
    logIn = async (creds) => {
        if(this.isLoggedIn){
            return this.userinfo;
        }

        const userFromClientDb = clientDb.get(userNameInClientDb);
        if(userFromClientDb){
            this.isLoggedIn = true;
            this.userinfo = JSON.parse(userFromClientDb);
            return this.userinfo;
        }

        const {error, user} = await this.httpService.fetchUser(creds);
        
        if(error){
            return {error};
        }

        this.lastConnection = Date.now();
        if(user){
            this.userinfo = user;
            this.isLoggedIn = true;
        }

        if(this.rememberme){
            clientDb.set(
                userNameInClientDb, 
                JSON.stringify(user)
            );
        }


        return this.userinfo;

    }

    
    @action.bound
    logOut = () => {
        if(!this.isLoggedIn){
            return {error: User.msg.LOGOUT_WHEN_NOT_LOGGED_IN}
        }

        this.userinfo = null;
        this.isLoggedIn = false;
        this.rememberme = false;

        clientDb.remove("userinfo")
    }
}

export default UserStore