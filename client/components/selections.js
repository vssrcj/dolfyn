import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SELECTIONS_WIDTH } from "../constants";

export default class Selections extends Component {

   render() {

      const { selections } = this.props;

      if(selections.length === 0) return (
         <div></div>
      );

      else return (
         <div class="selections" style={{ width: SELECTIONS_WIDTH }} ref="selections">
            {selections.map(selection => (
               <div
                  class="selection"
                  key={selection._id}
               >
                  <i class="material-icons">close</i>
                  <div class="name">{selection.name}</div>
               </div>
            ))}
         </div>
      );
   }
}
//<i class="material-icons" onClick={event => this.props.removeSelection(selection)}>close</i>

// class={`selection ${selection.color}`}
//   <i class="material-icons" style={{fontSize:"18px"}}>filter_list</i>
