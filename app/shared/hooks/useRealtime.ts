import {useRequestAnimationFrame} from "@/app/shared/hooks/useRequestAnimationFrame";
import {useRef, useState} from "react";

export const useRealtime = ()=>{
    const [time, setTime] = useState<number>(0);
    const frameTimes = useRef(0)
    useRequestAnimationFrame(()=>{
        frameTimes.current++
        if(frameTimes.current%5===0){
            const currentTime = Date.now();
            setTime(currentTime);
        }
    },[])

    return time
}