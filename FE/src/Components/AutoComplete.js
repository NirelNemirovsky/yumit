import React from 'react';
import Autosuggest from 'react-autosuggest';
import './AutoComplete.css';

class AutoComplete extends React.Component {

  state = {
    countries : [],
  }

 escapeRegexCharacters = (str)=> {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

 getSuggestions = (value)=> {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i');

    return this.state.countries.filter(country => regex.test(country));
  }

   renderSuggestion = (suggestion, { query }) =>{
    const suggestionText = `${suggestion.first} ${suggestion.last}`;
    const matches = this.AutosuggestHighlightMatch(suggestionText, query);
    const parts = this.AutosuggestHighlightParse(suggestionText, matches);

    return (
        <span className={'suggestion-content ' + suggestion.twitter}>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;

              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
  }


  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "הכנס מדינה",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

export default AutoComplete;
