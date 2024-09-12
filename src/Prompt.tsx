import { Line } from "./Line"
import { useState, useEffect, useRef } from "react"
import { AnalyzeCommand } from "./apis/command";
import { useNavigate } from "react-router-dom";
import { authStore } from "./store/authStore";
import { PromptStore } from "./store/PromptStore";
import { ParseResponse } from "./util/util";

export const Prompt = () => {
    const [value, setValue] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { lines, pushLines,pushCommand, prevCommand, nextCommand, clear, setIndexToTop } = PromptStore();
    const { getAccessToken, clearTokens } = authStore();

    const handleSubmit = () => {
        if (value === 'cls' || value === 'clear') {
            clear();
            setValue("");
            return;
        }
        if (value.trim() && value.length > 0) {
            pushCommand(value)
            pushLines([">> "+value]);
            setValue("");
            setIndexToTop();
        }
        AnalyzeCommand(value, getAccessToken())
            .then((res) => {
                pushLines(ParseResponse(res));
            }).catch((err) => {
                console.log(err)
                pushLines(ParseResponse(err));
            });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        } else if (e.key === 'ArrowUp') {
            setValue(prevCommand());
        } else if (e.key === 'ArrowDown') {
            setValue(nextCommand());
        }
    };

    const handleLogout = () => {
        clearTokens();
    };

    useEffect(() => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            navigate('/login');
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
        clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAccessToken()]);

    return (
        <>
            <div className="flex flex-col w-3/4 h-full min-w-[1000px] p-8 items-center bg-white rounded-2xl">
                <div className="flex w-full h-6 items-center pl-2 text-black text-xs bg-gray-300 font-mono rounded-t-md">
                    <div className="flex items-center">
                        <button className="h-3 w-3 rounded-full bg-red-500 hover:bg-slate-400 cursor-pointer" onClick={handleLogout}></button>
                        <button className="h-3 w-3 ml-1 rounded-full bg-gray-500 hover:cursor-default" onClick={()=>window.close()}></button>
                        <button className="h-3 w-3 ml-1 rounded-full bg-gray-500 hover:cursor-default"></button>
                    </div>
                <p className="flex-1 text-center font-extrabold">PlayWithDocker</p>
                </div>
                <div className="w-full h-full p-2 bg-black text-start text-base">
                   
                    <Line commands={lines} />
                    <div className="flex h-8 mt-2 gap-2">
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyUp={handleKeyPress}
                            className="w-full h-full bg-black p-4 text-sm text-white" />
                        <button
                            onClick={handleSubmit}
                            className="invisible" />
                    </div>
                </div>
            </div>
        </>
    );
};
