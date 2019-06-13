import React from 'react';
import {Link} from 'react-router-dom';
import CardInfo from './../cardinfo/cardinfo';
import Zoom from 'react-reveal/Zoom';
import './style.css'
const VideosListTemplate=(props)=>{
    return props.data.map((item,i)=>{
       return (<Zoom>
           <div className="card" key={i}>
             <Link to={`/videos/${item.id}`} >
                    <div className="videoListItem_wrapper">
                <div className="left"
                    style={{
                        background:`url(/images/videos/${item.image})`
                    }}
                >
                    <div></div>
                </div>
                <div className="right">
                    <CardInfo teams={props.teams} team={item.team} date={item.date}/>
                    <h2>{item.title}</h2>
                </div>
            </div>
        </Link>
        </div>
       </Zoom>)
       
    })
}
export default VideosListTemplate;