import React, { Component } from 'react'
import './style.css'
import Swing from 'react-reveal/Swing';
class TeamInfo extends Component{
    teamInfoTemplate=(data)=>{
        return data.map((item,i)=>{
            // console.log(item.stats[0].wins)
         
               return(
                   <Swing>
                          <div className="articleTeamHeader" key={i}>
        <div className="left2"
            style={{
                background: `url('/images/teams/${item.logo}')`
            }}
        >
        </div>
        <div className="right2">
            <div>
                <span > {
                    item.city
                } {
                    item.name
                } </span>
            </div>
            <div>
                <strong>
                    W{
                        item.stats[0].wins
                    } - L{
                        item.stats[0].defeats
                    }
                </strong>
            </div>
        </div>
    </div>
                   </Swing>
      )
        })
        
       
     
    }
    render(){
       
    //    console.log(this.props)
        return(<div>
               {
                   this.teamInfoTemplate(this.props.team)
               }
        </div>
         
            )
    }
}
export default TeamInfo