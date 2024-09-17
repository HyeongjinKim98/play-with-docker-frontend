import { useSearchParams, useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";


export const POST_LOGIN = (platform : string, code: string) => {
    const { setTokens, getAccessToken } = authStore();
    const navigate = useNavigate();
    fetch(`${process.env.REACT_APP_URL}/account/${platform.toLowerCase()}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: encodeURIComponent(code)
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.accessToken && data.refreshToken) {
                setTokens(data.accessToken, data.refreshToken);
                navigate('/');
            }
        })
        .catch(err => {
            console.error('로그인 실패:', err);
        });
}