import React from "react"
import { Engine, Render } from 'matter-js'

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
    return <MatterContext.Provider value={{ engine, render }}>
        {children}
    </MatterContext.Provider>
}


export { MatterContext, MatterContextProvider }
