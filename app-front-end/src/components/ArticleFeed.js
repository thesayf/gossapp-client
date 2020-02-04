import React from 'react';
import ArticleComponent from './ArticleComponent';

function ArticleFeed(props) {

  return (
    <React.Fragment>
      <div className="article-container">
      {
        props.posts.map(post => <ArticleComponent user={props.user} addComment={props.addComment} key={post.id} post={post} />)
      }
      </div>
    </React.Fragment>
  );
}
 
export default ArticleFeed;
