import React, { Component } from "react";
import { createContainer } from "meteor/react-meteor-data";
import SelectSearch from "./select-search";
import View from "./view";
import Account from "./account";
import { HEADER_HEIGHT } from "../../constants";

class Header extends Component {

   setLoggedIn(isLoggedIn) {
      this.setState({ isLoggedIn });
   }
   addSelection(selection) {
      this.setSearch("");
      this.props.addSelection(selection);
   }
   render() {

      const { selections, search, isLoggedIn } = this.props;
      return (
         <div class="header" style={{ height: HEADER_HEIGHT }}>
            { isLoggedIn ?
            <i
               class="material-icons header--add-selection"
               style={{}}
               onClick={this.props.setCreate}
            >
               add_box
            </i> : null }
            <SelectSearch
               selections={selections}
               search={search}
               setSearch={this.props.setSearch}
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

export default createContainer(() => {
   return { isLoggedIn: !!Meteor.userId() };
}, Header);
