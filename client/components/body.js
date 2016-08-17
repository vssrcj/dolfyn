import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Body extends Component {

   scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        ReactDOM.findDOMNode(this.refs.body).scrollLeft -= (delta*40); // Multiplied by 40
        e.preventDefault();
   }

   componentDidMount() {
      const ref = ReactDOM.findDOMNode(this.refs.body);
      ref.addEventListener("mousewheel", this.scrollHorizontally.bind(this), false);
      ref.addEventListener("DOMMouseScroll", this.scrollHorizontally.bind(this), false);
    }
   render() {
      return (
         <div class="body" ref="body">
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
            <div class="tt" />
         </div>
      )
   }
}
