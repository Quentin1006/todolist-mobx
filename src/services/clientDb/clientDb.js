const get = (key) => {
    return localStorage && localStorage.getItem(key);
}  

const set = (key, value) => {
    return localStorage && localStorage.setItem(key, value);
}


const remove = (key) => {
    return localStorage && localStorage.removeItem(key);
}


export default {
    get,
    set, 
    remove
}