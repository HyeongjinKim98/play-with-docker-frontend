import { Link } from "react-router-dom"
export const Login=()=>{
    return(
        <>
            <div className="flex flex-col w-96 h-full items-center bg-gray-400 rounded-md">
                <div className="flex w-full h-6 items-center pl-2 text-black text-xs bg-gray-200 font-mono rounded-t-md">
                <div className="flex items-center">
                    <button className="h-3 w-3 rounded-full bg-red-500 hover:bg-slate-400 cursor-pointer" onClick={()=>window.close()}></button>
                    <button className="h-3 w-3 ml-1 rounded-full bg-gray-500 hover:cursor-default" onClick={()=>window.close()}></button>
                    <button className="h-3 w-3 ml-1 rounded-full bg-gray-500 hover:cursor-default"></button>
                </div>
                <p className="flex-1 text-center font-extrabold">PlayWithDocker</p>
                </div>

                <div className="flex flex-col w-full bg-gray-200 p-4 justify-around gap-2">
                    <div className="p-16">
                        <img src='../asset/docker.svg' alt='err'/>
                    </div>
                    <div className="text-white bg-green-500 p-2 rounded-md text-lg">
                        <Link to={process.env.REACT_APP_OAUTH_URL_NAVER as string}>네이버 로그인</Link>
                    </div>
                    <div className="text-yellow-300 bg-black p-2 rounded-md text-lg">
                    <Link to={process.env.REACT_APP_OAUTH_URL_KAKAO as string}>카카오 로그인</Link>
                    </div>
                </div>
            </div>
           
        </>
    )
}