import { Meteor } from 'meteor/meteor';
import { Tags } from "../imports/collections/tags";

const TAGS = [
   { name: "Alfa", color: "red" },
   { name: "Bravo", color: "green" },
   { name: "Charlie", color: "blue" },
   { name: "Delta", color: "orange" },
   { name: "Echo", color: "teal" },
   { name: "Foxtrot", color: "pink" },
   { name: "Gamma", color: "black" }
];



Meteor.startup(() => {
   Tags._ensureIndex( { "name": "text" } );
   const numberOfRecords = Tags.find({}).count();

   if(!numberOfRecords) {
      TAGS.map(tag => Tags.insert(tag));
   }

   Meteor.publish('tags', function() {
      return Tags.find({});
   });
});
