import config from "../../config";
import uniqid from "uniqid";

const { Session, User } = config;


const { fetchUrl, fetchParams, } = User;

const { msg } = Session;


const FetchUserFactory = (request) => {
    const fetchUser = () => {
        return request(fetchUrl, {
            params: fetchParams,
        })
    } 

    const withCreds = (creds="") => {
        if(creds.toLowerCase() !== "basile"){
            return {error: msg.USER_NO_MATCH}
        }

        return fetchUser()
        .then(resp => {
            const user = resp.data.results[0];
            return {sessId: uniqid(), user};
        })
        .catch(error=> ({error: error.text()}));
    }

    const fromSessId = (sessId) => {
        return fetchUser()
        .then(resp => {
            const user = resp.data.results[0];
            return {user};
        })
        .catch(error=> ({error: error.text()}));
    }

    return {
        withCreds,
        fromSessId
    }
}


export default FetchUserFactory;