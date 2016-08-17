import React, { Component } from "react";
import Logo from "./logo";
import SelectSearch from "./select-search";
import View from "./view";
import Account from "./account";
import Selections from "./selections";

export default class Header extends Component {
   constructor() {
      super();
      this.state = {
         selections: [],
         search: ""
      };
   }
   addSelection(tag) {
      const { selections, tags } = this.state;
      this.setState({ selections: [ ...selections, tag ], search: "" });
   }
   removeSelection(selection) {
      const { selections } = this.state;
      const newSelections = selections.filter(s => s._id != selection._id);
      this.setState({ selections: newSelections });
   }
   setSearch(search) {
      this.setState({ search });
   }
   render() {
      const { selections, search } = this.state;
      return (
         <div class="header">
            <div class="top">
               <Logo />
               <SelectSearch
                  selections={selections}
                  search={search}
                  setSearch={this.setSearch.bind(this)}

                  addSelection={this.addSelection.bind(this)}
               />
               <div class="header--right">
                  <View />
                  <Account />
               </div>
            </div>
            <div>
               <Selections selections={selections} removeSelection={this.removeSelection.bind(this)}/>
            </div>
         </div>
      );
   }
}
