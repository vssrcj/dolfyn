import ReactDOM from "react-dom";
import React, { Component } from "react";
import { createContainer } from 'meteor/react-meteor-data';
import _ from "lodash";
import { Tags } from '../../../imports/collections/tags';


class SelectSearch extends Component {
   constructor(props) {
      super(props);

      this.state = {
         searchHasFocus: true
      };

      // bind all the below methods to this, so that they can access the state
      this.renderMatches = this.renderMatches.bind(this);
      this.onMatchKeyDown = this.onMatchKeyDown.bind(this);
      this.setSearchFocus = this.setSearchFocus.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
   }
   componentDidMount() {
      ReactDOM.findDOMNode(this.refs.search).focus();
   }
   renderMatches() {
      return this.props.matches.map(match =>
         <div
            class={`match ${match.color}`}
            key={match._id}
            onKeyDown={(event) => this.onMatchKeyDown(event.keyCode, match)}
            onClick={(event) => {
               this.props.addSelection(match);
               ReactDOM.findDOMNode(this.refs.search).focus();
            }}
            tabIndex="0"
         >
            {match.name}
         </div>
      );
   }
   onMatchKeyDown(keyCode, match) {
      if(![9, 13, 16].includes(keyCode)) {
         ReactDOM.findDOMNode(this.refs.search).focus();
      }
      else if(keyCode == 13){
         this.props.addSelection(match);
         ReactDOM.findDOMNode(this.refs.search).focus();
      }
   }
   setSearchFocus(searchHasFocus) {
      this.setState({ searchHasFocus });
   }
   onFormSubmit(event) {
      event.preventDefault();
   }
   render() {
      const { searchHasFocus } = this.state;
      const { setSearch, search } = this.props;
      return (
         <form onSubmit={this.onFormSubmit} class={`super-select${searchHasFocus ? ' focused' : ''}`}>
            <input
               type="text"
               ref="search"
               tabIndex="0"
               placeholder="Why don't you go ahead and search for something..."
               value={search}
               onFocus={() => this.setSearchFocus(true) }
               onBlur={() => this.setSearchFocus(false) }
               onChange={event => setSearch(event.target.value) }
               class="super-select--search"
            />
            <div class="super-select--matches">
               {this.renderMatches()}
            </div>
         </form>
      );
   }
}

export default createContainer(({ search, selections }) => {

   Meteor.subscribe('tags');
   const selectionIds = selections.map(s => s._id);

   if(search == "") return { matches: [] };
   else return {
      matches: Tags.find(
         { name: { $regex: search, $options: "i" } }
      ).fetch().filter(x => !selectionIds.includes(x._id))
   };
}, SelectSearch);
