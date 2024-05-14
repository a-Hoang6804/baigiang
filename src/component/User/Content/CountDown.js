import { useEffect, useState } from "react";

const CountDown = (props) => {
    const [count, setCount] = useState(3);
    useEffect(() => {
        if (count === 0) {
            props.onTimeUp();
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1)
            // console.log("run me");
        }, 1000)

        return () => {
            clearInterval(timer);
        }
    }, [count])
    //gg
    const toHHMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minites = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60
        return [hours, minites, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    return (
        <div className="countdown-container">
            {toHHMSS(count)}
        </div>
    )
}
export default CountDown;