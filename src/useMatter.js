/*
import {
    Engine,
    Render
} from 'matter-js'

export default () => {
    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            showAngleIndicator: false,
            wireframes: false
        }
    });

    return [ engine, render ]
}
*/

import {useContext} from "react";
import {MatterContext} from "./MatterContext";

export default () => {
    // noinspection JSCheckFunctionSignatures
    return useContext(MatterContext);
}
