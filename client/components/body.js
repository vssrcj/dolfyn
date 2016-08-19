import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import NewItem from "./new-item";

const colors = ["red","blue","yellow", "green", "black", "grey", "orange", "pink"];


export default class Body extends Component {

   scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      //  ReactDOM.findDOMNode(this.refs.body).scrollLeft -= (delta*40); // Multiplied by 40
        document.body.scrollLeft -= (delta*60); // Multiplied by 40
        e.preventDefault();
   }

   componentDidMount() {
      const ref = ReactDOM.findDOMNode(this.refs.body);
      ref.addEventListener("mousewheel", this.scrollHorizontally.bind(this), false);
      ref.addEventListener("DOMMouseScroll", this.scrollHorizontally.bind(this), false);
    }



   render() {
      let heightMinus, bodyClass;
      if(this.props.hasSelections) {
         heightMinus = 90;
         bodyClass = "body has-selections";
      }
      else {
         heightMinus = 52;
         bodyClass = "body";
      }

      const height = window.document.documentElement.clientHeight - heightMinus;
         console.log(height, window.innerHeight, document.body.clientHeight);
      return (
         <div class={bodyClass} ref="body" style={{height}}>
            <div>
               {_.times(10, (i) => <div class="a">{i} index</div>)}
            </div>
            <div class="q">
               <NewItem />
            </div>
            {_.times(30, (i) => {



               return <div class="q">
                  <div class="tt" style={{height: height/3, background: _.sample(colors)}}></div>
                  <div class="tt" style={{height: height/3, background:  _.sample(colors)}}></div>
                  <div class="tt" style={{height: height/3, background:  _.sample(colors)}}></div>
               </div>
            }
            )}
         </div>
      )
   }
}
