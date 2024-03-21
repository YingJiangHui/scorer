'use client';
import {NumberCountDisplay} from "@/app/scorer/components/NumberCountDisplay/NumberCountDisplay";
import {useCounter} from "@/app/shared/hooks/useCounter";
import {useRealtime} from "@/app/shared/hooks/useRealtime";


export default function ScorerPage() {
    const counter1 = useCounter({initialCount: 0, min: 0, max: 11})
    const counter2 = useCounter({initialCount: 0, min: 0, max: 11})
    return <div className={"bg-black text-white flex justify-center gap-[10%] p-5"}>
        <div className={"flex-1  text-center"}>
            <NumberCountDisplay className={"inline-block"} value={counter1.count} onClick={counter1.increment}/>
        </div>
        <div className={"bg-white w-2 h-100"}/>
        <div className={"flex-1 text-center"}>
            <NumberCountDisplay className={"inline-block"} value={counter2.count} onClick={counter2.increment}/>
        </div>
    </div>
}