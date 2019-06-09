import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sidenavItems'

const SideNavigation =(props)=>{
    return(
        <div>
            <SideNav 
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                navStyle={{
                    width:'220px',
                    height:'800px',
                    background:'black',
                    color:'white'
            }}>
                <SideNavItems user={props.user}/>
            </SideNav>
        </div>
    )
}
export default SideNavigation;