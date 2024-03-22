'use client';
import {NumberCountDisplay} from "@/app/scorer/components/NumberCountDisplay/NumberCountDisplay";
import {useCounter} from "@/app/shared/hooks/useCounter";
import {useTouchMove} from "@/app/shared/hooks/useGesture";
import {Viewport} from "next";

export const viewport: Viewport = {
    themeColor: 'black',
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
    viewportFit: "cover"
}
export default function ScorerPage() {
    const leftCounter = useCounter({initialCount: 0, min: 0, max: 11})
    const rightCounter = useCounter({initialCount: 0, min: 0, max: 11})
    useTouchMove((e) => {
        const counterMap = {left: leftCounter, right: rightCounter}
        const counter = counterMap[e.side!]
        if (e.delta && e.delta > window.innerHeight * 0.2) {
            switch (e.direction) {
                case "up":
                    counter.increment()
                    break;
                case "down":
                    console.log('down')
                    counter.decrement()
                    break;
            }
        }
    }, [leftCounter.increment, leftCounter.decrement, rightCounter.increment, leftCounter.decrement])
    return <div className={"bg-black text-white flex justify-center align-middle gap-[10%] p-5 h-full items-center"}>
        <div className={"flex-1  text-center relative"}>
            <NumberCountDisplay className={"inline-block"} value={leftCounter.count}/>
        </div>
        <div className={"text-white text-[90px]"}>
            :
        </div>
        <div className={"flex-1 text-center relative"}>
            <NumberCountDisplay className={"inline-block"} value={rightCounter.count}/>
        </div>
    </div>

}