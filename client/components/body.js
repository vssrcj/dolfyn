import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import _ from "lodash";
import Card from "./card";
import Selections from "./selections";
import { HEADER_HEIGHT, SELECTIONS_WIDTH } from "../constants";
import { Cards } from "../../imports/collections/cards";
import { markdown } from "markdown";
import { Link } from "react-router";

class Body extends Component {

   scrollHorizontally(e) {
      if(e.srcElement.className.trim() != "CodeMirror-line") {
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

   renderItem(item, height, j) {

      if(!item) return null;
      else {
         const url = `/${item._id}`;
         return (
            <div class="row" key={j} style={{ height }}>
               <div class="view-card">
                  <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(item.content) }}></div>
                  <div class="expand">
                     <Link to={url}>
                        <i class="material-icons">open_with</i>
                     </Link>
                  </div>
                  <div class="fader"></div>
               </div>
            </div>
         );
      }
   }

   renderItems(items, height) {
      return _.times(((items.length-1) / 3 + 1), i =>
         <div class="col" key={i}>
            { _.times(3, j => this.renderItem(items[i*3 + j], height/3, j )) }
         </div>
      )
   }

   render() {

      const height = window.innerHeight - HEADER_HEIGHT - 8;

      const { selections, cards } = this.props;

      return (
         <div class="body" ref="body" style={{ marginTop: HEADER_HEIGHT }}>

            <Selections
               selections={selections}
               removeSelection={this.props.removeSelection}
            />

            <div class="body--content" style={selections.length > 0 ? { marginLeft: SELECTIONS_WIDTH } : {} }>
               { this.props.create ? <Card height={height}/> : null }
               { this.renderItems(cards, height) }
            </div>

         </div>
      )
   }
}

export default createContainer(({ search }) => {
   Meteor.subscribe("cards");
   if(search == "") return { cards: Cards.find({}).fetch() };
   return {
      cards: Cards.find(
         { content: { $regex: search, $options: "i" } }
      ).fetch()
   }
}, Body);
