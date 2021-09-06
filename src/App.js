import {Body} from 'matter-js'
import {MatterContextProvider} from "./MatterContext";
import {useCallback, useEffect, useState} from "react";
import Wheel from "./Wheel";
import MouseControl from "./MouseControl";

export default () => {
    const [angle, setAngle] = useState(0)
    const [winner, setWinner] = useState('')
    const [wheelBase, setWheelBase] = useState(null)

    const onSpin = useCallback(() => {
        Body.setAngularVelocity(wheelBase, wheelBase.angularVelocity + 3 * Math.PI/100);
    }, [wheelBase])

    return <div>
        <button onClick={onSpin}>spin the wheel!</button>
        <label>Angle: </label><span>{angle.toFixed(1)}</span>
        <label>Winner: </label><span>{winner}</span>
        <MatterContextProvider>
            <Wheel onLoad={setWheelBase} onLanded={setWinner} onSpinning={setAngle} />
            <MouseControl />
        </MatterContextProvider>
    </div>
}
