import { observable, computed, action } from "mobx"

const TTL = 12;

class Notification {
    @observable id;
    @observable content;
    @observable date;
    @observable expire;
    @observable seen;
    @observable global;

    /**
     * type peut etre volatile ou sticky
     */
    @observable type;


    /**
     * Kind peut etre info, error, warning
     * concerne l'utilisateur
     */
    @observable kind;


    @computed 
    get isValid(){
        return this.expire - this.date > 0 || this.expire <= 0; 
    }

    static get GLOBAL(){ return "global"};
    static get LOCAL(){ return "local"};
    static get VOLATILE(){ return "volatile"};
    static get STICKY(){ return "sticky"};
    
    
    constructor({
        content,
        type=Notification.VOLATILE, 
        kind="info", 
        expire=TTL,
        global=true,
    }){
        this.content = content;
        // on force la notif a etre volatile si elle est locale
        this.type = global ? type : Notification.VOLATILE
        this.kind = kind;
        this.date = Date.now();
        this.id = `id${this.date}`;
        // Si la notif est sticky elle ne peut pas expirer
        this.expire = (type === Notification.VOLATILE) ? expire : 0;
        this.global = global;

        this.seen = !global;
    }
}


export default Notification;