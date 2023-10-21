const accessKey = "DP8B8s2wme03UCXNTfs6zbyiMGk5g3xXVFGoZWkWqSI";

const formEle = document.querySelector("form");
const inputEle = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more-button");

let inputData = "";
let page = 1;

async function seacrhImages() {
  inputData = inputEle.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    
    const desc = document.createElement("p");
    desc.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(desc);
    imageLink.appendChild(imageWrapper);
    searchResults.appendChild(imageLink);
  });

  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}

formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  seacrhImages();
});

showMoreButton.addEventListener("click", () => {
  seacrhImages();
});
