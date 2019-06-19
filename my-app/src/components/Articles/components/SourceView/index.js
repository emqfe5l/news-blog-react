import React from 'react';

const SourceItem = (props) => {
    return (
        <div className="thumb">
      <h2 className="title">{props.name}</h2>
      <p className="content">{props.description}</p>
      <a href={props.url}>{props.url}</a>
    </div>
    );
}

export default SourceItem;