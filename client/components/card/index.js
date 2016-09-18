import React, { Component } from "react";

import { createContainer } from "meteor/react-meteor-data";

import CodeMirror from "react-codemirror";
import "codemirror/mode/markdown/markdown";
import { Cards } from "../../../imports/collections/cards";
import Autosuggest from 'react-autosuggest';
import { markdown } from "markdown";

import { browserHistory } from "react-router";


export default class Card extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isPublic: false,
         aboutToDelete: false
      };
      this.onDeleteClick = this.onDeleteClick.bind(this);
   }

   onEditorChange(content) {
      Meteor.call("cards.update", this.props.card, content);
   }

   onDeleteClick(aboutToDelete) {
      this.setState({ aboutToDelete });
   }

   onPublicCheck() {
      Meteor.call("cards.update-public", this.props.card, !this.props.card.isPublic);

      this.setState({ isPublic: !this.state.isPublic });
   }

   removeCard(card) {
      Meteor.call("cards.remove", card);
   }

   componentDidMount() {
      window.onclick = function(event) {
         const className = event.target.className.trim();
         if(className == "card" || className == "content") {
            browserHistory.push("/");
         }
      }
   }

   render() {
      const { card } = this.props;
      const { aboutToDelete } = this.state;

      if(!card) return <div>Loading...</div>;

      const rawHTML = markdown.toHTML(this.props.card.content);

      return (
         <div class="card">
            <div class="modal-content" >
               <div class="content">
                  <div class="input">
                     <div class="title">
                        INPUT
                        <div class="label">Is it public?</div>
                     <section class="publicCheck">
                        <input type="checkbox" name="publicCheck" checked={card.isPublic} onChange={() => {}}/>
                        <label for="publicCheck" onClick={this.onPublicCheck.bind(this)}></label>
                     </section>
                     </div>
                     <div style={{marginTop: "5px", width: "100%"}}>
                        <CodeMirror
                           value={card.content}
                           onChange={this.onEditorChange.bind(this)}
                           options={{ mode: "markdown", lineWrapping: true, lineNumbers: true }}
                        />
                     </div>
                  </div>
                  <div class="output">
                     <div class="title">
                        OUTPUT
                        {aboutToDelete ?
                           <i class="material-icons del-forever" onClick={() => this.removeCard(card)}>delete_forever</i> :
                           <i class="material-icons del" onClick={() => this.onDeleteClick(true)}>delete</i>
                        }
                     </div>
                     <div class="out-text" >
                        <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}



export default createContainer(props => {
   const { cardId } = props.params;
   Meteor.subscribe("cards");
   return { card: Cards.findOne(cardId) };
}, Card);
