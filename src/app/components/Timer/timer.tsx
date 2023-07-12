import { useState, useRef, useCallback } from "react";

type UseTimerReturnDef = {
    count: number;
    startTimer: () => void;
    endTimer: () => void;
};

export default function useTimer(): UseTimerReturnDef {
    const [count, setCount] = useState<number>(0);
    const timerRef = useRef<number>(-1);

    // We must use useCallBack hook to avoid infinite re-render in wrapped component because startTimer and endTimer is reinitialized every time setCount is called
    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setCount(0);
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);
        // timerRef.current = timer;
    }, []);

    const endTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setCount(0);
    }, []);

    return { count, startTimer, endTimer };
}
