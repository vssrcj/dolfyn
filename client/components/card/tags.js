import React, { Component } from "react";
import { createContainer } from 'meteor/react-meteor-data';
import { Tags as TagCollection } from '../../../imports/collections/tags';


class Tags extends Component {
   getSuggestions(value) {
      const lower = value.toLowerCase();
     return this.props.matches.filter(m =>  !lower.includes(m.name));
   }
   getSuggestionValue(suggestion) {
      return suggestion.name;
   }
   render() {
      return (
         <input type="text"
         placeholder= "Tags"
         onFocus={() => console.log("focus")}
         style={{
           outline: "none",
           background: "none",
           border: "none",
           padding: "5px",
           fontSize: "13px",
           borderBottom: "1px solid #333",
           width: "100%",
           color: "#eee"
         }}

          />
      );
   }
}

export default createContainer(() => {

   Meteor.subscribe('tags');

   return {
      matches: TagCollection.find().fetch()
   };

}, Tags);
