import Notification from "../models/Notification";
import { observable, action, computed } from "mobx";

const TYPES = [Notification.STICKY, Notification.VOLATILE];


class NotificationStore {
    rootStore;
    httpService;
    autoSave = true;

    @observable isLoading = false;

    /**
     * Contient toutes les notifications
     */
    @observable notifs;
    

    // @computed
    // get size(){
    //     return this.notifs.global.sticky.length
    //     + this.notifs.global.volatile.length
    //     + Object.keys(this.notifs.local).length 
    // }


    constructor(rootStore, httpService){
        this.rootStore = rootStore;
        this.httpService = httpService;

        this.reset();
    }


    @action.bound
    load = async () => {
        this.isLoading = true;
        const fetched = await this.httpService.fetchNotifs();
        this.notifs = fetched.map(notif => new Notification(notif));
        this.isLoading = false;
    }


    sync = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {resolve()}, 2000);
        })
    }


    find = (notifId, typeIdx=0, found=false, notifDeleted=null) => {
        if(!!found){
            return notifDeleted;
        }

        if(typeIdx >= TYPES.length){
            return false;
        }

        const type = TYPES[typeIdx];

        this.notifs.global[type].forEach(notif => {
            if(notif.id === notifId){
                found = true;
                notifDeleted = notif;
            }
        })
        return this.remove(notifId, typeIdx+1, found, notifDeleted)
    }


    @action.bound
    add = ({content, type=Notification.VOLATILE, kind, expire}) => {
        // local notificaiton will be described this way local.componentName
        const global = !type.match(Notification.LOCAL);
        const newNotif = new Notification({content, type, kind, global, expire})
        
        if(global){
            this.notifs[Notification.GLOBAL][type].push(newNotif)
        }
        else {
            const [local, name] = type.split(".")
            this.notifs[Notification.LOCAL][name] = newNotif;
        }

        if(this.autoSave){
            this.sync();
        }

        return newNotif;
    }

    @action.bound
    remove = (notifId, typeIdx=0, found=false, notifDeleted=null) => {
        if(!!found){
            return notifDeleted;
        }

        if(typeIdx >= TYPES.length){
            return false;
        }

        const type = TYPES[typeIdx];

        this.notifs.global[type] = this.notifs.global[type].filter((notif, i) => {
            if(notif.id === notifId){
                found=true;
                notifDeleted = notif;
                return false;
            }
            return true;
        });

        return this.remove(notifId, typeIdx+1, found, notifDeleted)
    }


    @action.bound
    reset = () => {
        this.notifs = {
            local: {},
            global: {
                sticky:[],
                volatile: []
            }
        }
    }



}

export default NotificationStore