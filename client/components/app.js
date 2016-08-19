import React, { Component } from "react";
import Header from "./header";
import Body from "./body";

export default class App extends Component {
   constructor() {
      super();
      this.state = {
         selections: []
      };
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
      const { selections } = this.state;
      return (
         <div class="app">
            <Header
               addSelection={this.addSelection.bind(this)}
               removeSelection={this.removeSelection.bind(this)}
               selections={selections}
            />
            <Body
               hasSelections={selections.length > 0}
            />
         </div>
      );
   }
}
