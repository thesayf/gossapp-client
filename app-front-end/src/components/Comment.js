import React from 'react';

class Comment extends React.Component {
  
    render() {  
 
      return (
        <React.Fragment>
        <div className="ui container">
          <div className="ui list">
            <div className="item">
              <img className="ui avatar image" src={this.props.comment.user_info.image} />
                <div className="content">
                  <a className="header">{this.props.comment.user_info.name}</a>
                     <div className="description">{this.props.comment.content}</div>
                </div>
            </div>
          </div> 
        </div>
        </React.Fragment>
      );
    }
  }
  
  export default Comment;