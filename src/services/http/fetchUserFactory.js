const url = 'https://randomuser.me/api/';
const params = {
    nat: "fr",
    inc: "id,gender,name,email,picture,nat",
    seed: "helloworld",
    noinfo: true
}

const FetchUserFactory = (request) => {
    return () => {
        return request(url, {
            params,
        })
        .then(resp => resp.data.results[0])
    } 
}

export default FetchUserFactory;