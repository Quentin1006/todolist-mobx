import { observable, computed, action } from "mobx";
import clientDb from "../services/clientDb";
import config from "../config";

const { User, persistLogin } = config;

class UserStore {
    rootStore;
    httpService;

    @observable isLoggedIn = false;
    @observable isLoading = false;

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
        const id = this.userinfo && this.userinfo.id
        return  id && id.value
    }


    @action.bound
    logIn = async (creds) =>{

        let userinfo = {};

        if(this.isLoggedIn){
            return this.userinfo;
        }

        userinfo = clientDb.get("userinfo")
        if(persistLogin && userinfo){
            this.isLoggedIn = true;
            this.userinfo = JSON.parse(userinfo);

            return this.userinfo
        }

        userinfo = await this.httpService.fetchUser(creds);
        if(userinfo.id){
            this.userinfo = userinfo;
            this.isLoggedIn = true;
            persistLogin && clientDb.set("userinfo", JSON.stringify(userinfo))

            return this.userinfo;
        }

        return {error: User.msg.USER_NO_MATCH}
    }


    @action.bound
    logOut = () => {
        if(!this.isLoggedIn){
            return {error: User.msg.LOGOUT_WHEN_NOT_LOGGED_IN}
        }

        this.userinfo = null;
        this.isLoggedIn = false;
        clientDb.remove("userinfo")
    }
}

export default UserStore