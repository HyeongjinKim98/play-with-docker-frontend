import { POST_KAKAO_LOGIN } from "../apis/auth"
export const Login=()=>{
    return(
        <>
        <button
            onClick={POST_KAKAO_LOGIN}
        >
            hi
        </button>
        </>
    )
}