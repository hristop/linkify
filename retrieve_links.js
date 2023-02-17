// Retrieve the selected div and send it back to the popup
var selectedDiv = window.getSelection().anchorNode.parentNode;

var element = document.querySelector("#pg-app").shadowRoot.querySelector("#app-element").shadowRoot.querySelector("main > gr-change-view").shadowRoot.querySelector("#mainContent > section.changeLog > gr-messages-list").shadowRoot.querySelector("gr-message.expanded").shadowRoot.querySelector("div > div > div.content.messageContent > gr-formatted-text").shadowRoot.querySelector("pre > code")

console.log(element);

chrome.runtime.sendMessage({type: "display-div", html: element.innerHTML});