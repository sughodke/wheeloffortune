import {useContext} from "react";
import {MatterContext} from "./MatterContext";

export default () => {
    // noinspection JSCheckFunctionSignatures
    return useContext(MatterContext);
}
