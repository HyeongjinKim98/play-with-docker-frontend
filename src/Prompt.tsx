import { Line } from "./Line"
import { useState } from "react"
export const Prompt=()=>{
    const [commands,setCommands] = useState<string[]>([]);
    const [value,setValue]= useState<string>("");

    const handleSubmit = () => {
        if (value.trim()) {
            setCommands([...commands, value]);
            setValue("");
        }
    };
    return(
        <>
            <div className="flex flex-col w-full h-5/6 p-8 items-center bg-blue-100 rounded-2xl sm:w-2/3">
                <div className="text-3xl mb-7 text-blue-600">Play with docker</div>
                <div className="w-full h-full p-4 text-start text-base ">
                    <Line commands={commands}/>
                    <div className="flex h-12 mt-2 gap-2">
                        <input
                            value={value}
                            onChange={(e)=>setValue(e.target.value)}
                            className="w-full h-full p-2 text-lg"/>
                        <button
                            onClick={handleSubmit}
                            className="w-1/5 max-w-20 h-full bg-white p-2 text-center text-sm">SUBMIT</button>
                    </div>
                </div>
            </div>
            
        </>
    )
}