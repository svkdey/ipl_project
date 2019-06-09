import React from 'react';
import {Route,Redirect} from 'react-router-dom';
const PrivateRoute=({user,component:Comp,...rest})=>{
  
    return (<Route {...rest} component={
        (props)=>(user?<Comp {...props} user={user}/>:<Redirect to="/sign-in"/>)
    }/>)

}
const PublicRoute = ({ user, component: Comp, ...rest }) => {
    return <Route {...rest} component={(props) => (
        rest.restricted ?
            (user ?
                <Redirect to="/" />
                :
                <Comp {...props} user={user} />
            )
            :
            <Comp {...props} user={user} />
    )} />
}


export {PublicRoute,PrivateRoute}

