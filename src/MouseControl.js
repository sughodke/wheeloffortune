import {useEffect} from "react"
import useMatter from "./useMatter"
import {
    MouseConstraint,
    Mouse,
    Composite
} from 'matter-js'

export default () => {
    const { render, engine } = useMatter()

    useEffect(() => {
        // add mouse control
        const mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: true
                    },
                    // collisionFilter: {}
                }
            })

        Composite.add(engine.world, mouseConstraint)

        // keep the mouse in sync with rendering
        render.mouse = mouse
    }, [render, engine])

    return <></>
}
