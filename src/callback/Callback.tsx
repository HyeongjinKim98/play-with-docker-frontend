import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authStore } from "../store/authStore";

type Tplatform = {
    platform: 'NAVER' | 'KAKAO'
}

export const Callback = ({ platform }: Tplatform) => {
    const [params] = useSearchParams();
    const code = params.get('code');
    const navigate = useNavigate();
    const { setTokens, getAccessToken } = authStore();

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
            if (platform === 'KAKAO') {
                POST_KAKAO_LOGIN(code);
            } else if (platform === 'NAVER') {
                POST_NAVER_LOGIN(code);
            }
        }
    }, [code, platform]);

    const POST_KAKAO_LOGIN = (code: string) => {
        fetch(`${process.env.REACT_APP_URL}/account/kakao/login`, {
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
                    setTokens(data.accessToken, data.refreshToken); // authStore에 토큰 저장
                    navigate('/');
                }
            })
            .catch(err => {
                console.error('로그인 실패:', err);
            });
    }

    const POST_NAVER_LOGIN = (code: string) => {
        fetch(`${process.env.REACT_APP_URL}/account/naver/login`, {
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
                if (data.accessToken && data.refreshToken) {
                    setTokens(data.accessToken, data.refreshToken); // authStore에 토큰 저장
                    navigate('/');
                }
            })
            .catch(err => {
                console.error('로그인 실패:', err);
            });
    }

    return (
        <>
        </>
    );
}
