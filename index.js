const linkForm = document.getElementById("linkForm");
const linkList = document.getElementById("linkList");
const urlInput = document.getElementById("inputText");
const formWarning = document.getElementById("formWarning");
const buttonS = document.getElementsByClassName("copy-button");

window.addEventListener("load", function() {
    const storageLinkList = localStorage.getItem("links");
    if (!linkList.innerHTML) {
        linkList.innerHTML = storageLinkList;
    }
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

function newLink(urlName) {
    fetch(`https://api.shrtco.de/v2/shorten?url=${urlName}`)
    .then(res => res.json())
    .then(data => {
        linkListLi = document.createElement("li");
            linkListLi.className = "link-li";
            linkListLi.innerHTML = `<p class="website-link">${data.result.original_link}</p>
            <p class="shortened-link">${data.result.full_short_link}</p>
            <button class="copy-button" onClick="copyLink('${data.result.full_short_link}')">Copy</button>`
    
            linkList.appendChild(linkListLi);
            localStorage.setItem("links", linkList.innerHTML);   
    });
}

function copyLink(shortLink) {
    navigator.clipboard.writeText(shortLink);
}

function resetForm() {
    urlInput.value = "";
}