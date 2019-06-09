import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import Slick from 'react-slick'
const NewsSliderTemplate =(props)=>{
    let template=null;
    const settings={
        dots:true,
        infinite:true,
        arrows:false,
        speed:500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...props.data2.settings
    }
    switch (props.data2.type) {
        case 'featured':
            template = props.data1.map((item, i) => {
                return(
                    <div key={i}>
                       <div className="featured_item">
                            <div className="featured_image"
                                style={{
                                    background:`url(${item.image})`
                                }}></div>
                            <Link to={`/articles/${item.id}`}>
                                <div className="featured_caption">
                                    {item.title}
                                </div>
                            </Link>
                       </div>
                    </div>
                )
            })
            
            break;
    
        default:
            break;
    }
        // console.log(props.data2)
        return(
            <Slick {...settings}>
                {template}
            </Slick>
            
        )
    
}
export default NewsSliderTemplate;