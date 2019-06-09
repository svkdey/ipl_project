import React from 'react';
import Home from "./Components/Home/home"
import {Route,Switch} from 'react-router-dom';
import Layout from './Components/HOC/layout';
import VideoMainView from './views/videoMainView/videoContentView/videomain';
import VideoListView from './views/videoMainView/videolistview/videolistview'
import ArticleListView from './views/articleMainview/articlelistview/articlelistview'

import ArticleMainView from './views/articleMainview/articlecontentview/articlecontent'
import SignIn from './Components/signin/signin';
import DashBoard from './Components/dashboard/dashboard';
import {PublicRoute,PrivateRoute} from './Components/authroutes/authroutes';
import ContactDev from './Components/contactDiv'
class Routes extends React.Component{
    
    render(){
      
        return(
            <Layout {...this.props}>
                <Switch>
                 
                    <Route path="/" exact component={Home}/>
                    <Route path="/news" exact component={ArticleListView}/>
                    <Route path="/contactdev" exact component={ContactDev}/>
                    <Route path="/articles/:id" exact component={ArticleMainView}/>
                    <Route path="/videos/:id" exact component={VideoMainView}/>
                     <PrivateRoute {...this.props} path='/dashboard' exact component={DashBoard}/>
                    <Route path="/videos" exact component={VideoListView}/>
                     <PublicRoute {...this.props} restricted={true} path="/sign-in" exact component={SignIn}/>
                       
                </Switch>
            </Layout>
            
              )
            
    }
}

export default Routes;