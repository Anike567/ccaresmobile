import axios from 'axios';

export function LoginApiCall(loginData)
{
    console.log(loginData);
    axios.post('http://cares-cmpfo.in/redirector/member/login/find',loginData)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
   
    
}
