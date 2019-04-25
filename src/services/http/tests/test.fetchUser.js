import fetchUser from "./fetchUser";

(async () => {
    const user = await fetchUser();
    console.log(user);
})()
