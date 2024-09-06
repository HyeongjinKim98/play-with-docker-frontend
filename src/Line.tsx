import { useEffect, useRef } from 'react';
export const Line =({commands} : {commands : string[]})=>{
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    },[commands]);
    return(
        <>
         <div 
            ref={scrollRef}
            className="bg-white p-4 h-96 overflow-scroll">
            <div>
                {'$'} hello, play with docker! 
            </div>
            <div>
                {'$'} this is command line
            </div>
            {commands.map((command, index) => (
                    <div key={index}>{'$'} {command}</div>
            ))}
        </div>
        </>
    )
}