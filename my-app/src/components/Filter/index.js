import React from 'react';
import {categories} from '../../const/filter-params.js';

const Filter = (props) => {
  return (
    <React.Fragment>
      <ul className="filter-list">
        <li>
          <select id="category" onChange={props.onChange} value={props.category}>
            <option value="" disabled >Select category</option>
            { categories.map(value => <option value={value}>{value}</option>) }
          </select>
          
        </li>
        <li>
          <select id="language" onChange={props.onChange} value={props.language}>
            <option value="" disabled >Select languages</option>
            <option value="all">all</option>
            { props.languages.map(value => <option value={value.code}>{value.name}</option>) }
          </select>
          
        </li>
        <li>
          <select id="country" onChange={props.onChange} value={props.country}>
            <option value="" disabled >Select country</option>
            {props.countries.map(value => <option value={value.code}>{value.name}</option>) }
          </select>
        </li>
        <li>
          <input type="text" id="q" onChange={props.onChange} placeholder="live seacrh"/>
        </li>

      </ul>
      <p>{props.error}</p>
    </React.Fragment>
  );
}

export default Filter;