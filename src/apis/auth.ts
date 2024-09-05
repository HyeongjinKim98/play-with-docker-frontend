import { POST,GET } from "./common";

export const POST_KAKAO_LOGIN=()=>{
    fetch(process.env.REACT_APP_URL+'/account/kakao/login', {
        method: 'post',
        headers :{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code : ''
        })
      })
      .then(res => {
        if (res.status === 200) {
            console.log(res);
        }
      })
      .then(res => {
        console.log(res)
      })

}

export const POST_KAKAO_LOGOUT=()=>{
    const response= POST({
        path : '/account/kakao/logout',
        headers :{
            //temp
        }
    })
    return response;
}

export const POST_NAVER_LOGIN=()=>{
    const response= POST({
        path : '/account/naver/login',
        headers :{
            //temp
        }
    })
    return response;
}

export const POST_NAVER_LOGOUT=()=>{
    const response= POST({
        path : '/account/naver/logout',
        headers :{
            //temp
        }
    })
    return response;
}
export const POST_NAVER_STATE=()=>{
    fetch('/account/naver/state-value')
    .then((response) => response.json())
    .then((data) => console.log(data))
}