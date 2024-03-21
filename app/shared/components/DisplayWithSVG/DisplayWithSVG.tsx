import {SVGProps, useEffect, useRef, useState} from "react";
export interface DisplayWithSVGProps extends  SVGProps<SVGSVGElement>{
    value: number | string;
    fontSize?: number;
    textColor?: string;
    letterSpacing?: number;
}

export const DisplayWithSVG: React.FC<DisplayWithSVGProps> = ({ value ,letterSpacing = -5, fontSize = 24, textColor = 'black',...rest }: DisplayWithSVGProps) => {
    const numStr = value.toString();
    const textRef = useRef<SVGTextElement>(null);
    const [svgSize,setSvgSize] = useState<[number,number]>([0,0])
    useEffect(() => {
        if (textRef.current) {
            const bbox = textRef.current.getBBox();
            console.log(bbox,'bbox',textRef.current.getBoundingClientRect())
            setSvgSize([bbox.width,bbox.height])
        }
    }, [value, fontSize]);


    return (
        <svg width={svgSize[0]} height={svgSize[1]} {...rest} className={"cursor-pointer"}>
            <text ref={textRef} x="0" y={fontSize - 5} fontSize={fontSize} fill={textColor} letterSpacing={letterSpacing}>
                {numStr}
            </text>
        </svg>
    );
};
