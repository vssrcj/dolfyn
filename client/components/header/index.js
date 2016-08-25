import React, { Component } from "react";
import Logo from "./logo";
import SelectSearch from "./select-search";
import View from "./view";
import Account from "./account";
import { HEADER_HEIGHT } from "../../constants";

export default class Header extends Component {
   constructor() {
      super();
      this.state = {
         search: ""
      };
   }
   addSelection(selection) {
      this.setSearch("");
      this.props.addSelection(selection);
   }
   setSearch(search) {
      this.setState({ search });
   }
   render() {
      const { search } = this.state;
      const { selections } = this.props;
      return (
         <div class="header" style={{ height: HEADER_HEIGHT }}>
            <i
               class="material-icons header--add-selection"
               style={{}}
               onClick={() => this.setView("list")}
            >
               add_box
            </i>
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
      );
   }
}
