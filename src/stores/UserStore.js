import { observable, computed, action } from "mobx";


class UserStore {
    rootStore;
    httpService;

    @observable isLoading = false;
    @observable.struct userinfo;


    constructor(rootStore, httpService){
        this.rootStore = rootStore;
        this.httpService = httpService;
        this.userinfo = this.resetUser();
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

    @action.bound
    setUser = (user) => {
        this.userinfo = user;
    }

    
    @action.bound
    resetUser = () => {
        this.userinfo = {
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
    }
}

export default UserStore