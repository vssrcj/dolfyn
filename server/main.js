import { Meteor } from 'meteor/meteor';
import { Tags } from "../imports/collections/tags";

const TAGS = [
   { name: "Alfa", color: "red" },
   { name: "Bravo", color: "green" },
   { name: "Charlie", color: "blue" },
   { name: "Delta", color: "orange" },
   { name: "Echo", color: "teal" },
   { name: "Foxtrot", color: "pink" },
   { name: "Gamma", color: "black" },

   { name: "Golf", color: "red" },
   { name: "Hotel", color: "green" },
   { name: "India", color: "blue" },
   { name: "Juliett", color: "orange" },
   { name: "Kilo", color: "teal" },
   { name: "Lima", color: "pink" },
   { name: "Mike", color: "black" },

   { name: "November", color: "red" },
   { name: "Oscar", color: "green" },
   { name: "Papa	", color: "blue" },
   { name: "Quebec", color: "orange" },
   { name: "Romeo", color: "teal" },
   { name: "Sierra", color: "pink" },
   { name: "Tango", color: "black" }
];



Meteor.startup(() => {
   Tags._ensureIndex( { "name": "text" } );
   const numberOfRecords = Tags.find({}).count();
   Tags.remove({});

   //if(!numberOfRecords) {
      TAGS.map(tag => Tags.insert(tag));
   //}

   Meteor.publish('tags', function() {
      return Tags.find({});
   });
});
