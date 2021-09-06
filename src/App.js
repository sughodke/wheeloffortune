import {
    Render,
    Runner,
    Body
} from 'matter-js'
import {MatterContextProvider} from "./MatterContext";
import {useCallback, useEffect, useRef, useState} from "react";
import useMatter from "./useMatter";
import Wheel from "./Wheel";
import MouseControl from "./MouseControl";

// https://gamedev.stackexchange.com/a/72414


export default () => {
    const [angle, setAngle] = useState(0)
    const [wheelBase, setWheelBase] = useState(null)

    const onSpin = useCallback(() => {
        Body.setAngularVelocity(wheelBase, wheelBase.angularVelocity + 3 * Math.PI/100);
    }, [wheelBase])

    useEffect(() => {
        if (!wheelBase) return

        setInterval(() => {
            const currentAngle = 180/Math.PI * wheelBase.angle % 360;
            setAngle(currentAngle.toFixed(1))
        }, 50)
    }, [wheelBase])

    return <div>
        <button onClick={onSpin}>spin the wheel!</button>
        <label>Angle: </label><span>{angle}</span>
        <MatterContextProvider>
            <Wheel onLoad={setWheelBase}/>
            <MouseControl />
        </MatterContextProvider>
    </div>
}
