import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {categories} from './const/filter-params.js';
import {languages} from './const/filter-params.js';
import {countries} from './const/filter-params.js';
import { Api } from './api/api.js';
import './index.css';



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

const SourceItem = (props) => {
    return (
        <div className="thumb">
      <h2 className="title">{props.name}</h2>
      <p className="content">{props.description}</p>
      <a href={props.url}>{props.url}</a>
    </div>
    );
}

const Filter = (props) => {
  return (
      <ul className="filter-list">
        <li>
          <select id="category" onChange={props.onChange} value={props.category}>
            <option value="" disabled >Select category</option>
            {categories.map(value => <option value={value}>{value}</option>) }
          </select>
          <p>{props.category}</p>
        </li>
        <li>
          <select id="language" onChange={props.onChange} value={props.language}>
            <option value="" disabled >Select languages</option>
            {languages.map(value => <option value={value.code}>{value.name}</option>) }
          </select>
          <p>{props.language}</p>
        </li>
        <li>
          <select id="country" onChange={props.onChange} value={props.country}>
            <option value="" disabled >Select country</option>
            {countries.map(value => <option value={value.code}>{value.name}</option>) }
          </select>
          <p>{props.country}</p>
        </li>
      </ul>
    );
}

class Blog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            filter: {
              category: '',
              language: '',
              country: '',
            }
        }
    }

    // componentDidMount() {
    //   Api.request('GET', this.state.filter)
    // }

    selectChange = (event) => {

      let selectId = event.target.id;
      let filter = {...this.state.filter};

      filter[selectId] = event.target.value;
      this.setState({filter}, () => ApiCall() );
      
      const ApiCall = () => {
        Api.request('GET', this.state.filter).then(result => this.setState({data:result.sources}));
      }

    }

    renderSelect() {
      return (
        <Filter 
          category = {this.state.filter.category}
          language = {this.state.filter.language}
          country = {this.state.filter.country}
          onChange = {(e) => this.selectChange(e)}
        />
      )
    }

    renderBlogItem(dataItem) {
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

    renderSourceItem(dataItem) {
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

    render() {
        return (
          <React.Fragment>
            {this.renderSelect()}
            <div className="greed">
              {this.state.data.map(dataItem => this.renderSourceItem(dataItem))}
            </div>
          </React.Fragment>
        );
    }
}

// ========================================

ReactDOM.render(
    <Blog />,
    document.getElementById('root')
);