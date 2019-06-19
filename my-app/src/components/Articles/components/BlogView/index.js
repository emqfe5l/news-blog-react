import React from 'react';

const BlogItem = (props) => {
    return (
        <div className="thumb">
      <div className="image-holder">
        <img src={props.urlImg} />
      </div>
      <h2 className="title">{props.title}</h2>
      <p className="content">{props.content}</p>
    </div>
    );
}

export default BlogItem;