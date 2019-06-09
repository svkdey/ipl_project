import React, { Component } from 'react'




import NewsSlider from './../widgets/newsslider/newsslider';
import NewsArticle from './../widgets/newsarticle/newarticle';
import VideoArticle from './../widgets/videoarticle/videoarticle'
class Home extends Component{
    render(){
        return(
            <div>
            <NewsSlider 
                type="featured" start={0} amount={5} settings={{
                    dots:true
                }}
            />
            <NewsArticle 
                type="card1" loadmore={true} start={0} amount={2}
            />
            <VideoArticle 
                type="card1"
                title={true}
                loadmore={true}
                start={0}
                amount={3}
                related = {null}
            />
            </div>
            
        )
    }
}

export default Home;