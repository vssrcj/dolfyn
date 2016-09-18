import { Mongo } from "meteor/mongo";

Meteor.methods({
   "cards.insert": function() {
      return Cards.insert({
         createdAt: new Date(),
         content: "",
         isPublic: false,
         ownerId: this.userId
      });
   },
   "cards.update": function(card, content) {
      return Cards.update(card._id, { $set: { content } });
   },
   "cards.update-public": function(card, isPublic) {
      return Cards.update(card._id, { $set: { isPublic } });
   },
   "cards.remove": function(card) {
      return Cards.remove(card);
   }
});

export const Cards = new Mongo.Collection("cards");
