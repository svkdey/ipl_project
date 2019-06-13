import React from 'react';
import './style.css';
import moment from 'moment'
import Tada from 'react-reveal/Tada';
const Publisher=(props)=>{
    const getDate=(date)=>{
        return moment(date).format("MMM Do YY");
    }
    return(<Tada>
           <div className="card">
             <div className="articlePostData">
        <div>
            Date:
        < span>{getDate(props.date)}</span>
        </div>
        <div>
            Author:
            <span>{props.author}</span>
        </div>
    </div>
        </div>
    </Tada>
     
        
    )
}
export default Publisher;

