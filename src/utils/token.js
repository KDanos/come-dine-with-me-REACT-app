const tokenName = 'userToken'

export const setToken = (token) =>{
    localStorage.setItem(tokenName, token)
}

export const getToken = () => {
    return localStorage.getItem (tokenName)
}

export const removeToken = () =>{
    localStorage.removeItem(tokenName)
}

export const getUserFromToken = () =>{
    //1. Get token from local storage
    const token = getToken()
    //2. If there is no token, return null
    if(!token){return null}
    //3. Get the middle payload string from the token
    const usefullInfo = token.split('.')[1]
    //4. Decode from b64, using atob() method. This will return a JSON string
    const userString = atob(usefullInfo)
    //5. User JSON.parse() to convert the string to an object
    const{user, exp} = JSON.parse(userString)
    //6. Check the expiry date has not passed
    if (exp<Date.now()/1000){
        removeToken()
        return null
    }
    //7. Return the user
    return user
}