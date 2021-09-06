import {
    Render,
    Runner
} from 'matter-js'
import {MatterContextProvider} from "./MatterContext";
import {useEffect, useRef} from "react";
import useMatter from "./useMatter";
import Wheel from "./Wheel";
import MouseControl from "./MouseControl";

// https://gamedev.stackexchange.com/a/72414


export default () => {
    const { render, engine } = useMatter()
    const wheelBase = useRef()

    useEffect(() => {
        // fit the render viewport to the scene
        const zoom = 0.5
        Render.lookAt(render, {
            min: { x: -200 * zoom, y: -250 * zoom },
            max: { x: 200 * zoom, y: 0 }
        });

        // run the renderer
        Render.run(render);

        // create runner
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);
    }, [engine])

    /*
    const onSpin = useCallback(() => {
        Body.setAngularVelocity(wheelBase, wheelBase.angularVelocity + 3 * Math.PI/100);
    }, [wheelBase])

    useEffect(() => {
        setInterval(() => {
            const angle = 180/Math.PI * wheelBase.angle % 360;
            angleEl.innerText = angle.toFixed(1)
        }, 50)
    }, [wheelBase])
    */

    return <div>
        <button onClick={alert}>spin the wheel!</button>
        <label>Angle: </label><span id="angle"></span>
        <MatterContextProvider>
            <Wheel ref={wheelBase}/>
            <MouseControl />
        </MatterContextProvider>
    </div>
}
