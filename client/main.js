import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/app";
import Card from "./components/card";

const routes = (
   <Router history={browserHistory}>
      <Route path="/" component={App}>
         <Route path="/:cardId" component={Card} />
      </Route>
   </Router>
);

Meteor.startup(() => {
   ReactDOM.render(routes, document.querySelector("#app"));
})
