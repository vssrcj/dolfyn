import { Meteor } from 'meteor/meteor';
import { Tags } from "../imports/collections/tags";
import { Cards } from "../imports/collections/cards";

Meteor.startup(() => {

   Meteor.publish("cards", function() {
      //return Cards.find();
      return Cards.find({ $or: [{ ownerId: this.userId }, { isPublic: true }] });
   });

   // Tags._ensureIndex( { "name": "text" } );
   // const numberOfRecords = Tags.find({}).count();
   // Tags.remove({});
   //
   // Meteor.publish('tags', function() {
   //    return Tags.find({});
   // });
});
