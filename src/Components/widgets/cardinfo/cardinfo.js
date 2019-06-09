import React from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import './style.css'
const CardInfo=(props)=>{
    // console.log(props)
    const teamName=(teams,team)=>{
       let data=teams.find((item)=>{
           return item.teamId===team
       })
       if(data){
           return data.name
       }
    }
    const formdate=(data)=>{
        return moment(data).format('MMMM Do YYYY, h:mm:ss a');
    }

return (
    <div className="cardInfo">
        <span className="teamName">{teamName(props.teams,props.team)}</span>
        <span className="date">
            <FontAwesome name="clock-o"/>
            {formdate(props.date)}
        </span>
    </div>)
}

export default CardInfo;