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
      return (
         <div class="view">
            <i
               class={`material-icons${view == "list" ? " selected" : ""}`}
               onClick={() => this.setView("list")}
            >list</i>
            <i
               class={`material-icons${view == "view_list" ? " selected" : ""}`}
               onClick={() => this.setView("view_list")}
            >view_list</i>
            <i
               class={`material-icons${view == "view_column" ? " selected" : ""}`}
               onClick={() => this.setView("view_column")}
            >view_column</i>
         </div>
      );
   }
}
