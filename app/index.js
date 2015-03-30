// * global JST  */

import FlagsSvc from "services/flags";
import profileTpl from "templates/profile";

let svc = new FlagsSvc();

// JST is a compiled views container
// @todo: investigate how to use harmony import for text/html.
// let profileTpl = JST['profile.html'];
// let profileTpl = this["MyApp"]["templates"]["profile"],

let run = function(querySelector) {
    let container = document.querySelector(querySelector);
    if (!container) {
        throw new Error("no container element found");
    }

    svc.getAll().then((allItems) => {
        // container.innerHTML = profileTpl({title: "title", collection: allItems});
        console.log('profileTpl', profileTpl);
    });
};

export default run;
