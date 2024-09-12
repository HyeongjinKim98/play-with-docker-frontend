import { POST,GET } from "./common";

export const POST_KAKAO_LOGIN=()=>{
    const code = 'y99NJBkuHCxa8d8GzcU62Bgm9aAFsG8H000LyRfW84JYHc5Vcph90AAAAAQKKiVTAAABkdI6wt7dCc_9be4aqQ'
    console.log(code)
    console.log(encodeURIComponent(code))
    fetch(process.env.REACT_APP_URL+'/account/kakao/login', {
        method: 'post',
        headers :{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code : encodeURIComponent(code)
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

export const POST_NAVER_LOGOUT=()=>{
    const response= POST({
        path : '/account/naver/login',
        headers :{
            //temp
        }
    })
    return response;
}

export const POST_NAVER_LOGIN=()=>{
    fetch(process.env.REACT_APP_URL+'/account/naver/login', {
        method: 'post',
        headers :{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code : 'yoaLSKwHOSHCPgDEr2&state=bl2rqr9upnqhlm7678cognl7g3'
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
export const POST_NAVER_STATE=()=>{
    fetch('/account/naver/state-value')
    .then((response) => response.json())
    .then((data) => console.log(data))
}