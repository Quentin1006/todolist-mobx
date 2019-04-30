import React from "react";
import { firstToCap } from "../../../../utils"


const WelcomeMessage = ({name}) => {
    return (
        <h1>Hey {firstToCap(name)} !</h1>
    )
    
}

WelcomeMessage.defaultProps = {
    name: ""
}
    


export default WelcomeMessage;