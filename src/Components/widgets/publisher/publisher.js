import React from 'react';
import './style.css';
import moment from 'moment'
const Publisher=(props)=>{
    const getDate=(date)=>{
        return moment(date).format("MMM Do YY");
    }
    return(
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
        
    )
}
export default Publisher;

