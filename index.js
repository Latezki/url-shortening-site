const linkForm = document.getElementById("linkForm");
const linkList = document.getElementById("linkList");

linkForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const urlName = document.getElementById("link-text").value;
    console.log(urlName);

    newLink(urlName);
});

async function newLink(urlName) {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlName}`);
    response.json().then(data => {
        const li = document.createElement("li");
        const url = document.createElement("p");
        const shortLink = document.createElement("p");
        const button = document.createElement("button");
        url.className = "website-link"
        url.innerHTML = urlName
        shortLink.className = "shortened-link";
        shortLink.innerHTML = data.result.full_short_link;
        button.className = "copy-button";
        button.innerHTML = "Copy";
        li.appendChild(url);
        li.appendChild(shortLink);
        li.appendChild(button);
        linkList.appendChild(li);
    });
}