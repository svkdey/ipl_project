import React, { Component } from 'react';
import {firebaseTeams,firebaseDB,firebaseLooper,firebase} from './../../../firebase'
import TeamInfo from './../../../Components/widgets/teaminfo/teaminfo'
import './style.css';
import Publisher from './../../../Components/widgets/publisher/publisher'
import Jump from 'react-reveal/Jump';
class ArticleMainView extends Component {

    state = {
        article:[],
        team: [], 
        stats: [],
        imageURL:''
    }

    componentWillMount(){
        // // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        // // .then( response => {
        // //     let article = response.data[0];

        //     axios.get(`${URL}/teams?id=${article.team}`)
        //     .then( response => {
        //         this.setState({
        //             article,
        //             team:response.data[0],
        //             stats: response.data[0].stats[0]
        //         })
        //     })
        // })
      firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
      .then((snapshot) => {
                  let article = snapshot.val();
                  
                      firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
                          .then((snapshot) => {
                              const team = firebaseLooper(snapshot)
                              console.log()
                              this.setState({
                                  article,
                                  team: team,
                                  stats: team[0].stats
                              })
                              this.getImageURL(article.image)
                          })
                }
      )
    }
    getImageURL = (filename) => {
    firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then(url => {
            this.setState({
                imageURL: url
            })
        })
}

    render(){
        const article = this.state.article;
        // const team = this.state.team;
        // console.log(this.state)
        return(
            <div className="articleWrapper">
                {/* <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                /> */}
                <TeamInfo team={this.state.team}/>
                <Publisher date={article.date}
                    author={article.author} />
               
                <div className="articleBody">
                    <Jump>
                    <h1>{article.title}</h1>
                    <div className="articleImage"
                        style={{
                            background:`url('${this.state.imageURL}')`
                        }}
                    ></div>
                    <div className="articleText"
                     dangerouslySetInnerHTML={{
                        __html:article.body
                    }}>
                       
                    </div></Jump>
                </div>
            </div>
        )
    }
}

export default ArticleMainView;