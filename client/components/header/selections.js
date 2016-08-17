import React, { Component } from "react";

export default class Selections extends Component {

   renderSelections() {
      const { selections } = this.props;

      if(selections.length > 0) {
         return (
            <div class="bottom">
               {selections.map(selection => (
                  <div
                     class={`selection ${selection.color}`}
                     key={selection._id}
                  >
                     <i class="material-icons" onClick={event => this.props.removeSelection(selection)}>close</i>
                     <div class="name">{selection.name}</div>
                  </div>
               ))}
            </div>
         );
      }

      else return <div></div>;
   }
   render() {
      return (
         <div class="selections">
            {this.renderSelections()}
         </div>
      );
   }
}
//
//   <i class="material-icons" style={{fontSize:"18px"}}>filter_list</i>
