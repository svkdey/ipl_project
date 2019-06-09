import React from 'react';
// import {Link} from 'react-router-dom';

const Button=(props)=>{
    // console.log(props)
    var template=null;
    switch (props.type) {
        case "loadmore":
                template=
                <div className = "btn btn-secondary form-control"
                    onClick={props.loadMore}
                >
                    {props.cta}
                </div>
            break;
    
        default:
            template = null;
            break;
    }
    return template;
}

export default Button;