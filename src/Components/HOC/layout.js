import React, { Component } from 'react'

import Header from '../header/header';
import Footer from '../footer/footer';
import './style.css'
class Layout extends Component{
    state={
        navState:false,
    }
    toggleSideNav=(action)=>{
        this.setState({
            navState:action,
        })
    }
    render(){
        // console.log(this.props.user)
        return(<div>
            <Header 
            user={this.props.user}
            showNav={this.state.navState}
                onHideNav={()=>this.toggleSideNav(false)}
                onOpenNav={()=>this.toggleSideNav(true)}
            />
             {this.props.children}
             <Footer/>
        </div>)
    }
}
export default Layout;