import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const DomainKey = 'Sass-Domain'
const UserKey = 'User-Name'
const UserArray = 'User-Array'
/*token*/
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    //	console.log(token)
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

/*domain*/
export function getDomain() {
    return Cookies.get(DomainKey)
}

export function setDomain(domain) {
    //	console.log(domain)
    return Cookies.set(DomainKey, domain)
}

export function removeDomain() {
   return Cookies.remove(DomainKey)
}

/*Username*/
export function getUserKey() {
    return Cookies.get(UserKey)
}

export function setUserKey(username) {
    //	console.log(domain)
    return Cookies.set(UserKey, username, { expires: 365 })
}

export function removeUserKey() {
    return Cookies.remove(UserKey)
}

/*UserArray*/
export function getUserArray() {
    return Cookies.get(UserArray)
}

export function setUserArray(obj) {
    let arr = getUserArray();
    let a;
    if(arr){
        a = JSON.parse(arr);
        if(a instanceof Array){
            let n = a.findIndex((ele) => {
                return ele.name == obj.name
            })
            if(n == -1){
                a.push(obj);
            }else{
                a[n].value = obj.value;
            }
            
        }     
    }else{
        a = [];
        a.push(obj);
    }
    return Cookies.set(UserArray, a, { expires: 365 })
}

export function removeUserArray() {
    return Cookies.remove(UserArray)
}