const form = document.querySelector("#searchForm");
const container = document.createElement("div");
document.body.appendChild(container);


form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchItem = form.elements.query.value;
    const config = {params: {q: searchItem }}
    const res = await axios.get('https://api.tvmaze.com/search/shows', config);
   displaySearchResults(res.data);
   form.elements.query.value = '';
});

function getRatingColor(rating) {
  if (rating >= 8) {
      return 'green';
  } else if (rating >= 5) {
      return 'orange';
  } else {
      return 'red';
  }
}

const displaySearchResults =  (shows) => {
    container.innerHTML = '';
    shows.forEach(result => {
        if(result.show.image && result.show.rating && result.show.summary){
            const resultContainer = document.createElement("div");
            resultContainer.classList.add("result-container");

            const img = document.createElement("img");
            img.src = result.show.image.medium;
            resultContainer.appendChild(img);

            const title = document.createElement("h3");
            title.textContent = result.show.name;
            title.classList.add("title");
            resultContainer.appendChild(title);

            const rating =  document.createElement("p");
            rating.textContent = `Rating: ${result.show.rating.average}`;
            rating.classList.add("rating");
           
            const color = getRatingColor(result.show.rating.average);
            rating.style.color = color; 
            resultContainer.appendChild(rating);


            const moreInfo = document.createElement("p");
            const summary = result.show.summary.replace(/<[^>]+>/g, ''); 
            moreInfo.textContent = summary.length > 100 ? summary.substring(0, 100) + '...' : summary;
            moreInfo.classList.add("more-info");
            resultContainer.appendChild(moreInfo);

            container.appendChild(resultContainer);
        }
    });
}
 //   for(let result of shows){
//if(result.show.image.medium){
  //  const img = document.createElement("img");
    //img.src = result.show.image.medium
   // document.body.append(img);
//}
  //  }
//}