import React from 'react';
import VideosListTemplate from './../../../Components/widgets/videoarticle/videostemplate'
// import VideoArticle from './../../../Components/widgets/videoarticle/videoarticle';
const VideoRelated=(props)=>{
    // console.log(props)
    return(
        <div >
        
        <VideosListTemplate data={props.data} teams={props.teams}/> 
        </div>)
       
}

export default VideoRelated;
