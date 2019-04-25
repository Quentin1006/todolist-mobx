import UiStore from "./UiStore";
import TodoStore from "./TodoStore";
import UserStore from "./UserStore";
import NotificationStore from "./NotificationStore";

import { HttpService } from "../services/http"


class RootStore {
    constructor() {
        this.uiStore = new UiStore(this);

        const httpService = new HttpService({
            beforeReq: () => {this.uiStore.pendingRequest +=1},
            afterReq: () => {this.uiStore.pendingRequest -=1}
        });

        this.userStore = new UserStore(this, httpService);
        this.todoStore = new TodoStore(this, httpService);
        this.notificationStore = new NotificationStore(this, httpService);
        
    }
}

export default RootStore;