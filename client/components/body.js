import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import NewItem from "./new-item";
import Selections from "./selections";
import { HEADER_HEIGHT, SELECTIONS_WIDTH } from "../constants";

const colors = ["red","blue","yellow", "green", "black", "grey", "orange", "pink"];

export default class Body extends Component {

   scrollHorizontally(e) {
      if(e.srcElement.className != "card-3") {
         e.preventDefault();
         e = window.event || e;
         var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
         document.body.scrollLeft -= (delta*60);
      }
   }

   componentDidMount() {
      const ref = ReactDOM.findDOMNode(this.refs.body);
      ref.addEventListener("mousewheel", this.scrollHorizontally.bind(this), false);
      ref.addEventListener("DOMMouseScroll", this.scrollHorizontally.bind(this), false);
   }

   render() {

      const height = window.innerHeight - HEADER_HEIGHT - 8;

      const { selections } = this.props;

      return (
         <div class="body" ref="body" style={{ marginTop: HEADER_HEIGHT }}>
            <Selections
               selections={selections}
               removeSelection={this.props.removeSelection}
            />
            <div class="body--content" style={selections.length > 0 ? { marginLeft: SELECTIONS_WIDTH } : {} }>
               {_.times(30, i => (
                  <div class="col-s" key={i}>
                     <div class="row-s" style={{ height: height/3 }}>
                        <div class="card">{_dummy}</div>
                     </div>
                     <div class="row-s" style={{ height: height/3 }}>
                        <div class="card">{_dummy}</div>
                     </div>
                     <div class="row-s" style={{ height: height/3 }}>
                        <div class="card">{_dummy}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )
   }
}
//<div class="q">
//
//</div><NewItem />
//<div class="card-3" style={{height: height/3, background:  _.sample(colors)}}></div>

const _dummy = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";
