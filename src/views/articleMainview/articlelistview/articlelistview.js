import React from 'react';
import NewsSlider from './../../../Components/widgets/newsslider/newsslider';
import NewsArticle from './../../../Components/widgets/newsarticle/newarticle';
const ArticleListView=()=>{
    return(
        <div style={{height:"90vh"}}>
             <NewsSlider 
                type="featured" start={0} amount={10} settings={{
                    dots:false
                }}
            />
            <NewsArticle 
                type="card2" loadmore={true} start={0} amount={6}
            />
        </div>
    )


}

export default ArticleListView;