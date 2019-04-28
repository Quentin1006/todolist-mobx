import config from "../../config";

const { User } = config;

const {
    fetchUrl, 
    fetchParams, 
    msg
} = User;


const FetchUserFactory = (request) => {
    return (creds="") => {
        if(creds.toLowerCase() !== "basile"){
            return {error: msg.USER_NO_MATCH}
        }

        return request(fetchUrl, {
            params: fetchParams,
        })
        .then(resp => {
            const user = resp.data.results[0];
            return {user};
        })
        .catch(error=> ({error: error.text()}));
    }
}

export default FetchUserFactory;