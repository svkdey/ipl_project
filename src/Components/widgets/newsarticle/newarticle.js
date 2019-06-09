import React, { Component } from 'react'

import {Link} from "react-router-dom";
import  {TransitionGroup,CSSTransition} from 'react-transition-group';

import styles from './style.css';
import './card.css';
import Button from './../button/button';
import CardInfo from './../cardinfo/cardinfo';
import {
    firebaseArticles,
    firebaseLooper, firebaseTeams
} from './../../../firebase'
class NewsArticle extends Component {
   state = {
       teams: [],
       items: [],
       start: this.props.start,
       end: this.props.start + this.props.amount,
       amount: this.props.amount
   }

   componentWillMount() {
       this.request(this.state.start, this.state.end)
   }

   request = (start, end) => {
       if (this.state.teams.length < 1) {
           firebaseTeams.once('value')
               .then((snapshot) => {
                   const teams = firebaseLooper(snapshot);
                   this.setState({
                       teams
                   })
               })


           // axios.get(`${URL}/teams`)
           // .then( response => {
           //     this.setState({
           //         teams:response.data
           //     })
           // })
       }

       firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
           .then((snapshot) => {
               const articles = firebaseLooper(snapshot);
               this.setState({
                   items: [...this.state.items, ...articles],
                   start,
                   end
               })
           })
           .catch(e => {
               console.log(e)
           })

       // axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
       // .then( response => {
       //     this.setState({
       //         items:[...this.state.items,...response.data],
       //         start,
       //         end
       //     })
       // })
   }
//    getImageURL = (filename) => {
       
//            firebase.storage().ref('images')
//                .child(filename).getDownloadURL()
//                .then(url => {
                   
//                    console.log(url)
//                })
              
//             }

   loadMore = () => {
       let end = this.state.end + this.state.amount;
       this.request(this.state.end + 1, end)
   }
    renderNews=(type)=>{
      var template=null;
    //   console.log(this.state)
      switch (type) {
          case 'card1':
              template=this.state.items.map((item,i)=>{
                  return(
                      <CSSTransition
                       classNames={{
                            enter:styles.newsList_wrapper,
                            enterActive:styles.newsList_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                        >
                            <div className="card w-100" >
                                <div className="card-body">
                                        <Link to={`/articles/${item.id}`}>
                                            <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                                            <p className="card-text">{item.title}</p>
                                        </Link>
                                </div>
                            </div>

                      </CSSTransition>
                  )
              })
              
              break;
      case 'card2':
               template = this.state.items.map((item,i) => (
                    <CSSTransition
                    classNames={{
                        enter:"newsList_wrapper",
                        enterActive:"newsList_wrapper_enter"
                    }}
                    timeout={500}
                    key={i}
                    >
                        <Link to={`/articles/${item.id}`}>
                            <div className="flex_wrapper">
                                {/* <div className="left2"
                                    style={{
                                        background: `url(${this.getImageURL(item.image)})`
                                    }}>
                                    <div></div>
                                </div> */}
                                <div className="right2">
                                    <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                                    <h2>{item.title}</h2>
                                </div>
                            </div>
                        </Link>
                    </CSSTransition>))
              
              break;
          default:
              template=null;
              break;
      }
      return template;
    }
    
    
    
    render(){
        // console.log(this.state)
        return(
            <div>
            <TransitionGroup>
                {this.renderNews(this.props.type)}
            </TransitionGroup>
            <Button
                    type="loadmore"
                    loadMore={()=>this.loadMore()}
                    cta="Load More News"
                />
            </div>
            
        )
    }
}

export default NewsArticle;