import React, { Component } from "react";
import Header from "./header";
import Body from "./body";

import { browserHistory } from "react-router";

export default class App extends Component {
   constructor() {
      super();
      this.state = {
         selections: [], create: false, search: ""
      };
      this.setSearch = this.setSearch.bind(this);
   }

   setSearch(search) {
      this.setState({ search });
   }

   setCreate() {
      Meteor.call("cards.insert", (error, cardId) => {
         browserHistory.push(cardId);
      });

      //this.setState({ create: true });
   }



   addSelection(newSelection) {
      this.setState({
         selections: [ ...this.state.selections, newSelection ]
      });
   }
   removeSelection(selection) {
      const selections = this.state.selections.filter(s => s._id != selection._id);
      this.setState({ selections });
   }
   render() {
      const { selections, search } = this.state;

      return (
         <div class="app">
            <Header
               addSelection={this.addSelection.bind(this)}
               selections={selections}
               setCreate={this.setCreate.bind(this)}
               setSearch={this.setSearch.bind(this)}
               search={search}
            />
            <Body
               selections={selections}
               removeSelection={this.removeSelection.bind(this)}
               create={this.state.create}
               search={search}
            />
            { this.props.children }
         </div>
      );
   }
}
