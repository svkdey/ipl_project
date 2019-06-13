import React from 'react';
import {firebaseVideos,firebaseTeams,firebaseDB,firebaseLooper} from './../../../firebase'
import TeamInfo from '../../../Components/widgets/teaminfo/teaminfo';
import Pulse from 'react-reveal/Pulse';
import "./style.css";
import VideoRelated from './../relatedvideos/videorelated'
class VideoMainView extends React.Component {
    
    state={
        article:[],
        team:[],
        teams:[],
        related:[],
        stats:[]
    }
     componentWillMount(){
        // axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        // .then( response => {
        //     let article = response.data[0];

        //     axios.get(`${URL}/teams?id=${article.team}`)
        //     .then( response => {
        //         this.setState({
        //             article,
        //             team:response.data[0],
        //             stats:response.data[0].stats[0]
        //         });
        //         this.getRelated();
        //     })
        // })
         firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
             .then((snapshot) => {
                 let article = snapshot.val();
                 firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
                     .then((snapshot) => {
                         const team = firebaseLooper(snapshot)
                         this.setState({
                             article,
                             team: team
                         });
                         this.getRelated();
                     })



             })
    }

    getRelated = () => {
       
        // axios.get(`${URL}/teams`)
        // .then( response =>{
        //     let teams = response.data

        //     axios.get(`${URL}/videos?q=${this.state.team.city}&_limit=3`)
        //     .then( response =>{
        //         this.setState({
        //             teams,
        //             related:response.data
        //         })
        //     })
        // })
         firebaseTeams.once('value')
             .then((snapshot) => {
                 const teams = firebaseLooper(snapshot);
                 firebaseVideos.orderByChild("team").equalTo(this.state.article.team)
                     .limitToFirst(3).once('value')
                     .then((snapshot) => {
                         const related = firebaseLooper(snapshot);
                         this.setState({
                             teams,
                             related
                         })
                     })
             })
    }

 render(){
    //  console.log(this.props.match)
    //  console.log(this.state)
     const article=this.state.article;
    //  teams=this.state.teams;
     return(
         
         <div>
            <TeamInfo team={this.state.team}/>
            
            <div className="videoWrapper">
            <Pulse>
                <h4>{article.title}</h4>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    >
                    </iframe>
            </Pulse>
                    
                </div>
                {/* <div>Video that will run</div> */}
            <VideoRelated data={this.state.related} teams={this.state.teams}/>
         </div>
        
     )
 }
    
}

export default VideoMainView;