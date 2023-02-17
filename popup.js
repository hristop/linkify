// When the button is clicked, inject the content script into the current tab
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("display-div-button").addEventListener("click", function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {file: "retrieve_links.js"});
        });
    });
});

  // Listen for the message from the content script and append the selected div to the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "display-div") {
        let aMsg = message.html.split("-->");
        let msg = aMsg.length > 1 ? aMsg[1] : aMsg[0];

        const transformLinks = function (text) {
            text = text.replace(/actual:/g, "<br><span class=\"actual\">actual:</span>");
            text = text.replace(/reference:/g, "<br><span class=\"reference\">reference:</span>");
            text = text.replace(/difference:/g, "<br><span class=\"difference\">difference:</span>");

            return text.replace(/(https:\/\/\S+)/g, '<a href="$1">$1</a><br>');
        }
        const transformedText = transformLinks(msg);
        //console.log(transformedText);

        //popupContainer.innerHTML = transformedText;

        //document.getElementById("display-div-button").innerText = "Get the links again";

        chrome.tabs.create({url: 'data:text/html,' + encodeURIComponent(renderNewPage(transformedText))});
    }
});

function renderNewPage(content) {
    const html = "" +
    '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '    <style>' +
    '       html {' +
    '           font-size: 16px;' +
    '           min-width: 900px;' +
    '           font-family: Verdana, Geneva, Tahoma, sans-serif;' +
    '           overflow-x: hidden;' +
    '       }' +
    '       body {' +
    '           padding: 20px 40px;' +
    '       }' +
    '       h1 {' +
    '           margin: 10px;' +
    '           color: #8623f7;' +
    '           font-size: 2rem;' +
    '           margin: auto;' +
    '       }' +
    '       button {' +
    '           font-size: 1.2rem;' +
    '           margin-bottom: 20px;' +
    '       }' +
    '       #popup-container {' +
    '           font-size: 1rem;' +
    '           color:rgb(81, 81, 81);' +
    '           width: auto;' +
    '           overflow-x: none;' +
    '       }' +
    '       a {' +
    '           color: cornflowerblue;' +
    '       }' +
    '       .actual,' +
    '       .reference,' +
    '       .difference {' +
    '           font-weight: bold;' +
    '       }' +
    '       .actual {' +
    '           color: blue;' +
    '       }' +
    '       .reference {' +
    '           color: limegreen;' +
    '       }' +
    '       .difference {' +
    '           color: red;' +
    '       }' +
    '       .hint {' +
    '           font-size: 1.5rem;' +
    '           color:orange;' +
    '       }' +
    '    </style>' +
    '</head>' +
    '<body>' +
    '    <main>' +
            content +
    '    </main>' +
    '</body>' +
    '</html>';

    return html;
}