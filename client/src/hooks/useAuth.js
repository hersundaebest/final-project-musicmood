import { useEffect, useState } from "react";

const useAuth = (code) => {
const [accessToken, setAccessToken] = useState();

useEffect(() => {
fetch('/login', {
    method: "POST",
    body: JSON.stringify({code}),
    headers: {
        Accept: "application/json", 
    "Content-Type": "application/json"
}})
.then(res => res.json())
.then(data => {
    window.history.pushState({}, null, "/mood/")
    console.log(data);
    setAccessToken(data.accessToken);
    sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
})
.catch((err) => console.log(err.message))
}, [code])
return accessToken;
}

export default useAuth;