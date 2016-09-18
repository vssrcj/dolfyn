import React, { Component } from "react";

export default class View extends Component {
   constructor() {
      super();
      this.state = {
         view: "list"
      };
      this.setView = this.setView.bind(this);
   }
   setView(view) {
      this.setState({ view });
   }
   render() {
      const { view } = this.state;
      return null;
      return (
         <div class="view">
            <i
               class={`material-icons${view == "list" ? " selected" : ""}`}
               onClick={() => this.setView("list")}
            >list</i>
            <i
               class={`material-icons${view == "grid" ? " selected" : ""}`}
               onClick={() => this.setView("grid")}
            >grid_on</i>
            <i
               class={`material-icons${view == "column" ? " selected" : ""}`}
               onClick={() => this.setView("column")}
            >view_column</i>
         </div>
      );
   }
}
