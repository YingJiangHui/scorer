import {useState} from "react";
import {useWindowResize} from "@/app/shared/hooks/useWindowResize";

export const useDynamicFontSize = (padding: number,count: number): number => {
    const [fontSize, setFontSize] = useState(24);

    useWindowResize(()=>{
        const maxWidth = window.innerWidth / 2 - padding;
        setFontSize(Math.min(maxWidth / count, window.innerWidth / 2));
    },[padding,count])

    return fontSize;
};