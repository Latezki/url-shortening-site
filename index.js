const linkForm = document.getElementById("linkForm");
const linkList = document.getElementById("linkList");
const urlInput = document.getElementById("inputText");
const inputDiv = document.getElementById("inputDiv");
const formWarning = document.getElementById("formWarning");


window.addEventListener("load", function() {
    const storageLinkList = localStorage.getItem("links");
    if (!linkList.innerHTML) {
        linkList.innerHTML = storageLinkList;
    }
});

linkForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const urlName = urlInput.value.toLowerCase();
    console.log(urlName);

    var warningText = document.createElement("p");
    warningText.innerHTML = `<p class="form-warning" id="formWarning">Add a valid url</p>`;

    if (urlName.includes(".") && urlName.length > 5 && urlName.match("^[a-z0-9.]+$")) {
        newLink(urlName);
        formWarning.style.display = "none";
        urlInput.classList.remove("warning-border");
        resetForm();
    } else {
        formWarning.style.display = "block";
        urlInput.classList.add("warning-border");
    }
});

function newLink(urlName) {
    fetch(`https://api.shrtco.de/v2/shorten?url=${urlName}`)
    .then(res => res.json())
    .then(data => {
        const linkListLi = document.createElement("li");
            linkListLi.className = "link-li";
            linkListLi.innerHTML = `<p class="website-link">${data.result.original_link}</p>
            <p class="shortened-link">${data.result.full_short_link}</p>
            <button class="copy-button" onClick="copyLink('${data.result.full_short_link}'); changeButton(event);">Copy</button>`
            linkList.appendChild(linkListLi);
            localStorage.setItem("links", linkList.innerHTML);   
    });
}

function copyLink(shortLink) {
    navigator.clipboard.writeText(shortLink);
}

function changeButton(event) {
    const btn = event.target;
    btn.classList.remove("copy-button");
    btn.classList.add("copied-button");
    btn.innerHTML = "Copied!";
}

function resetForm() {
    urlInput.value = "";
}