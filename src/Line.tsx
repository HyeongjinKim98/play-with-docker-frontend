import { useEffect, useRef } from 'react';

export const Line = ( { commands } : {commands : string[]} ) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [commands]);
    const formatLine = (line: string) => {
        return line.replace(/ /g, '\u00A0');
    };

    return (
        <div 
            ref={scrollRef} 
            className="bg-black p-4 h-96 overflow-auto text-white text-xs font-mono"
        >
            <div>
                Hello Docker!
            </div>
            {commands.map((line, index) => (
                <div key={index}>
                    <span dangerouslySetInnerHTML={{ __html: formatLine(line) }} />
                </div>
            ))}
        </div>
    );
};
