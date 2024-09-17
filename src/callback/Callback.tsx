import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authStore } from "../store/authStore";

export const Callback = ({platform} : {platform : string}) => {
    const [params] = useSearchParams();
    const code = params.get('code');
    const navigate = useNavigate();
    const { setTokens, getAccessToken } = authStore();

    const POST_LOGIN = (platform : string, code: string) => {
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

    useEffect(() => {
        console.log(platform);
        console.log(code);

        const token = getAccessToken();

        if (token) {
            console.log('이미 로그인된 사용자');
            navigate('/');
            return;
        }

        if (code) {
            POST_LOGIN(platform,code)
        }
    }, [code, platform]);
    return (
        <>
        </>
    );
}
