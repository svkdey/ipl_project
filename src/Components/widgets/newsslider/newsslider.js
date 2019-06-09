import React, { Component } from 'react'
import {firebaseArticles,firebaseLooper,firebase} from './../../../firebase';
import NewsSliderTemplate from './newsslidertemplate'
class NewsSlider extends Component {
    state={
        news:[]
    }
    componentWillMount(){
        // axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        //     .then(res=>{
        //         this.setState({
        //             news:res.data
        //         })
        firebaseArticles.limitToFirst(4).once('value')
            .then((snapshot) => {
                const news = firebaseLooper(snapshot);
                // method1
                //    news.forEach((item,i)=>{
                //        firebase.storage().ref('images')
                //        .child(item.image).getDownloadURL()
                //        .then(url=>{
                //            news[i].image=url;
                //            this.setState({
                //                news
                //            })
                //        })
                //    })
                const asyncFunction = (item, i, cb) => {
                    firebase.storage().ref('images')
                        .child(item.image).getDownloadURL()
                        .then(url => {
                            news[i].image = url;
                            cb();
                        })
                }


                // let request = [promise 1(ended), promise 2(ended), promise 3(ended)]
                let requests = news.map((item, i) => {
                    return new Promise((resolve) => {
                        asyncFunction(item, i, resolve)
                    })
                })

                Promise.all(requests).then(() => {
                    this.setState({
                        news
                    })
                })



            })


    }
    render(){
        // console.log(this.state.news)
        // console.log(this.props)
        return(
            <div>
       
            <NewsSliderTemplate data1={this.state.news} data2={this.props}/>
            
            </div>
            
        )
    }
}

export default NewsSlider;