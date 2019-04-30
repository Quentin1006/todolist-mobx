import { observable, computed, action } from "mobx";

import clientDb from "../services/clientDb";
import config from "../config";

const { Session, UNKNOWN_ERROR } = config;
const { shouldExpire, timeout, msg } = Session;

const REMEMBER_ME_CLIENTDB = "rememberme";
const SESS_ID_CLIENTDB = "sess-id";

class SessionStore {
    rootStore;
    httpService;
    timeout = timeout;

    @observable isLoggedIn;
    @observable isLoading = false;
    @observable autoConnect = false;
    @observable rememberme = clientDb.get(REMEMBER_ME_CLIENTDB) || false;
    @observable lastConnection = -1;

    constructor(rootStore, httpService){
        this.rootStore = rootStore;
        this.httpService = httpService;
    }


    @computed
    get sessionIsExpired(){
        if(shouldExpire && this.isLoggedIn){
            return this.lastConnection > 0 &&
                    (this.lastConnection + this.timeout) - Date.now() < 0;
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
        clientDb.set(REMEMBER_ME_CLIENTDB, this.rememberme);
        return this.rememberme;
    }

    @action.bound
    logInFromSessId = async () => {
        if(this.isLoggedIn){
            return {error: msg.ALREADY_LOGGED_IN};
        }

        const sessFromClientDb = clientDb.get(SESS_ID_CLIENTDB);
        if(sessFromClientDb){
            const {error, user} = await this.httpService.fetchUser.fromSessId();
            if(user){
                this.isLoggedIn = true;
                return {user};
            }
            if(error){
                return {error};
            }
            return {error: UNKNOWN_ERROR};  
        }
        return { error: msg.SESSION_INEXISTANT};
    }


    @action.bound
    logIn = async (creds) => {
        if(this.isLoggedIn){
            return {info: msg.ALREADY_LOGGED_IN};
        }

        const {error, sessId, user} = await this.httpService.fetchUser.withCreds(creds);
        
        if(error){
            return {error};
        }

        if(user){
            this.lastConnection = Date.now();
            this.isLoggedIn = true;
        }

        if(this.rememberme){
            clientDb.set(
                SESS_ID_CLIENTDB, 
                sessId
            );
        }
        return {user};
    }

    
    @action.bound
    logOut = () => {
        if(!this.isLoggedIn){
            return {error: msg.LOGOUT_WHEN_NOT_LOGGED_IN}
        }
        this.isLoggedIn = false;
        this.rememberme = false;
        clientDb.remove(SESS_ID_CLIENTDB)
    }
}

export default SessionStore
