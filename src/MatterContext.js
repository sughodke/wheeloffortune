import React, {useEffect} from "react"
import {Engine, Render, Runner} from 'matter-js'

// create an engine
const engine = Engine.create()

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        showAngleIndicator: false,
        wireframes: false,
    }
})

const MatterContext = React.createContext({
    engine,
    render,
})

const MatterContextProvider = ({ children, initialContext = {} }) => {
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

    return <MatterContext.Provider value={{ engine, render }}>
        {children}
    </MatterContext.Provider>
}


export { MatterContext, MatterContextProvider }
