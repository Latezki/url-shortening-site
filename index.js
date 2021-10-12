const linkForm = document.getElementById("linkForm");
const linkList = document.getElementById("linkList");
const urlInput = document.getElementById("inputText");
const formWarning = document.getElementById("formWarning");
const buttonS = document.getElementsByClassName("copy-button");

var linkArray =[];
var linkItems = JSON.parse(localStorage.getItem("links"));

window.addEventListener("load", function() {
    for (var i = 0; i < linkItems.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = linkItems[i];
        linkList.appendChild(li);
        linkArray.push(li.innerHTML);
    }

    localStorage.setItem("links", JSON.stringify(linkArray));
});

for (var i = 0 ; i < linkList.length; i++) {
    buttonS[i].addEventListener("click", function(e) {
        console.log("clicked");
    }); 
 }


linkForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const urlName = urlInput.value.toLowerCase();
    console.log(urlName);

    if (urlName.includes(".") && urlName.length > 5 && urlName.match("^[a-z0-9.]+$")) {
        newLink(urlName);
        resetForm();
        formWarning.style.visibility = "hidden";
        urlInput.classList.remove("warning-border");
    } else {
        formWarning.style.visibility = "visible";
        urlInput.classList.add("warning-border");
    }
});

async function newLink(urlName) {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlName}`);
    response.json().then(data => {
        const li = document.createElement("li");
        const url = document.createElement("p");
        const shortLink = document.createElement("p");
        // const button = document.createElement("button");
        li.className = "link-li"
        url.className = "website-link"
        url.innerHTML = urlName
        shortLink.className = "shortened-link";
        shortLink.innerHTML = data.result.full_short_link;
        // button.className = "copy-button";
        // button.innerHTML = "Copy";
        li.appendChild(url);
        li.appendChild(shortLink);
        // li.appendChild(button);
        linkList.appendChild(li);

        linkArray.push(li.innerHTML);
        localStorage.setItem("links", JSON.stringify(linkArray));

        /*
        button.addEventListener("click", function(e) {
            navigator.clipboard.writeText(shortLink.innerHTML);
        });
        */
    });
}

function resetForm() {
    urlInput.value = "";
}