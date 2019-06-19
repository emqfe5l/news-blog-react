import React from 'react';
import { Api } from '../../api/api.js';
import Articles from '../Articles';
import Filter from '../Filter';
import {languages} from '../../const/filter-params.js';
import {countries} from '../../const/filter-params.js';

class App extends React.Component {

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
              q: '',
            },
            languages: [],
            sources: [],
            countries: [],
            error: '',
        }
    }

    componentDidMount() {
      Api.request('GET','sources', this.state.filter).then(result => this.setDefaultSources(result.sources))
    }

    handleChange = (event) => {

      let selectId = event.target.id;
      let filter = {...this.state.filter};
      console.log(filter);
      filter[selectId] = event.target.value;
      this.setState({filter}, () => this.ApiCall() );

    }

    ApiCall = () => {
        Api.request('GET','top-headlines',this.state.filter).then(result => {
          if(result.status === 'error'){
            this.setState({error:result.message})
            this.setState({data:[]})
          }else {
            this.setState({error:''})
            this.setState({data:result.articles})
          }
        }
      );
    }

    setDefaultSources = (data) => {
      this.setState({languages: this.getSourcesLanguages(data)})
      this.setState({countries: this.getCountries(data)})
    }

    getSourcesLanguages = (data) => {

      const SourceLanguages = languages.filter((el,i) => data.find(lang => lang.language === el.code))

      return SourceLanguages
    }

    getCountries = (data) => {

    const SourceCountries = data.reduce((acc,item) => !acc.find((element) => element && element.code.toLowerCase() === item.country) ? 
      [...acc, countries.find(el => el.code.toLowerCase() === item.country) || {
        name: item.country,
        code: item.country,
      }]
      : acc,[]);
    
      // const SourceCountries = countries.filter((el,i) => data.find(item => item.country.toUpperCase() === el.code))

      return SourceCountries
    }

    render() {
        return (
          <React.Fragment>
            <Filter 
              category = {this.state.filter.category}
              language = {this.state.filter.language}
              country = {this.state.filter.country}
              languages = {this.state.languages}
              countries = {this.state.countries}
              onChange = {(e) => this.handleChange(e)}
              error = {this.state.error}
            />
            <Articles data = {this.state.data} />
          </React.Fragment>
        );
    }
}

export default App;