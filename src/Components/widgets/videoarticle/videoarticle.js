import React, { Component } from 'react'
import {
    firebaseVideos,
    firebaseLooper,
    firebaseTeams
} from './../../../firebase';

import Button from './../button/button';
import VideosListTemplate from './videostemplate'

import './style.css';
class VideoArticle extends Component {
    
    state={
        teams:[],
        videos:[],
        start:this.props.start,
        end: this.props.start+this.props.amount,
        amount:this.props.amount,
        // related:this.props.related

    }
    componentWillMount() {
             this.request(this.state.start, this.state.end)
         }
 request = (start, end) => {
     if (this.state.teams.length < 1) {
        //  axios.get(`${URL}/teams`)
        //      .then(response => {
        //          this.setState({
        //              teams: response.data
        //          })
        //      })
         firebaseTeams.once('value')
             .then(snapshot => {
                 var data = firebaseLooper(snapshot);
                 this.setState({
                     teams: data
                 })
                //  console.log(data)
             }).catch(e => {
                 console.log(e)
             })

     }

    //  axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
    //      .then(response => {
    //          this.setState({
    //              videos: [...this.state.videos, ...response.data],
    //              start,
    //              end
    //          })
    //      })
    firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then(snapshot => {
            var video = firebaseLooper(snapshot);
            this.setState({
                videos: [...this.state.videos, ...video],
                start,
                end
            })
        })
 }
         renderTitle=()=>{
            return this.props.title?<h3><strong>KKR</strong> Videos</h3>: null
         }
          loadMore = () => {
              let end = this.state.end + this.state.amount;
              this.request(this.state.end, end)
          }
          renderBtn=()=>{
              return this.props.loadmore?
              <Button
                    type="loadmore"
                    loadMore={()=> this.loadMore()}
                    cta="Load More Videos"
                />
                : 
                <Button type="linkTo" cta="More videos" linkTo="/videos"/>
            }
            renderVideos=()=>{
                 let template = null;

            switch(this.props.type){
                case('card1'):
                    template =<VideosListTemplate data={this.state.videos} teams={this.state.teams}/>
                    break;
                default:
                    template = null
            }
            return template;
        }
            
          
    render(){
        // console.log(this.state)
        return(
            <div className="videoList_wrapper">
            {this.renderTitle()}
           
            { this.renderVideos()}
            {this.renderBtn()}
            </div>
            
        )
    }
}

export default VideoArticle;