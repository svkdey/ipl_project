import React from 'react';
import Spin from 'react-reveal/Spin';

const ContactDev =()=>{
    return(
        <Spin>
        <div className="container jumbotron"
        style={{height:"80vh"}}> 
        <div>
                Created and Maintained By: <strong>Souvik Dey</strong>
        </div>
        <div>
            Contact me On Gmail: <strong>deysouvik955@gmail.com</strong>
        </div>
        <div> GitHub:<a href="https://github.com/svkdey"> https://github.com/svkdey</a></div>
        <div>
            StackList: <strong>React and Firebase for authentication,storage,database,hosting</strong>
        </div>
         
         </div>
         </Spin>
    )
}

export default ContactDev;