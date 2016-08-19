import React, { Component } from "react";

export default class NewItem extends Component {

   renderSelections() {
      const { selections } = this.props;

      if(selections.length > 0) {
         return (
            <div class="bottom">
               <span style={{fontSize: "12px", marginLeft: "10px"}}>filter</span>
               {selections.map(selection => (
                  <div
                     class="selection"
                     key={selection._id}
                  >
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
         <div class="card-3">
         </div>
      );
   }
}
//<i class="material-icons" onClick={event => this.props.removeSelection(selection)}>close</i>

// class={`selection ${selection.color}`}
//   <i class="material-icons" style={{fontSize:"18px"}}>filter_list</i>
