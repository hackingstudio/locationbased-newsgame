import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/es/LinearProgress";

import styles from "./countDown.module.scss";

const resolution = 0.01;

const CountDown = ({ time = 10 }) => {
    const [waitingTime, setWaitingTime] = useState(time);
    useEffect(() => {
        const progress = () => {
            setWaitingTime(oldWaitingTime => {
                if (oldWaitingTime <= time * resolution) {
                    return 0;
                }
                return oldWaitingTime - time * resolution;
            });
        };
        const timer = setInterval(progress, time * resolution * 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return <LinearProgress className={styles.countDownTop} value={(waitingTime / time) * 100} variant="determinate" />;
};

export default CountDown;
