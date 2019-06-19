import React from 'react';
import BlogItem from './components/BlogView';
import SourceItem from './components/SourceView';

const Articles = (props) => {

    const renderBlogItem = (dataItem) => {
        return (
            <BlogItem
        author = {dataItem.author}
        content = {dataItem.content}
        description = {dataItem.description}
        published = {dataItem.published}
        title = {dataItem.title}
        url = {dataItem.url}
        urlImg = {dataItem.urlToImage}
       />
        );
    }

    const renderSourceItem = (dataItem) => {
        return (
            <SourceItem
      category = {dataItem.category}
      country = {dataItem.country}
      description = {dataItem.description}
      id = {dataItem.id}
      language = {dataItem.language}
      name = {dataItem.name}
      url = {dataItem.url}
       />
        );
    }

    return (
        <div className="greed">
            {props.data.map(dataItem => renderBlogItem(dataItem))}
        </div>
    );


}

export default Articles;