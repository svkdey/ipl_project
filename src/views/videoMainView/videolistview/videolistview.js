import React from 'react';
import VideoArticle from './../../../Components/widgets/videoarticle/videoarticle'
class VideoListView extends React.Component {
    render(){
        return ( 
        <div>
            <VideoArticle
            type="card1"
            title={false}
            loadmore={true}
            start={0}
            amount={10}
            related={null}
            /></div>)
    }
}

export default VideoListView;