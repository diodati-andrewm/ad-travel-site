async function loadData() {
    const response = await fetch("./travel_recommendation_api.json");
    const json = await response.json();
    console.log("searching. . .")
    var query = document.getElementById("search").value;
    var results = json[getQueryKey(query)];
    if(getQueryKey(query) == "countries") {
        results = results[0].cities;
    }
    return results;
  }

async function scriptFunction() {
    clearing(); // remove previous results
    var data = await loadData();
    const results_p = document.getElementById("results-data");
    console.log(data);
    for(let i = 0; i<data.length; i++) {
        let div = document.createElement('div');
        let loc = document.createElement('h3');
        loc.textContent = data[i].name;
        div.appendChild(loc);
        let img = document.createElement('img');
        img.src = data[i].imageUrl;
        div.appendChild(img);
        let p = document.createElement('p');
        p.textContent = data[i].description;
        div.appendChild(p);
        results_p.appendChild(div);
    }
}

function clearing() {
    console.log("clearing. . .");
    let parentElement = document.getElementById('results-data');
    removeAllChildren(parentElement);
}

function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

function getQueryKey(query) {
    var lowerQuery = query.toLowerCase();
    var acceptedQueries = ["beach", "beaches", "temple", "temples", "country", "countries"]
    var isKeyWord = false;
    if(acceptedQueries.includes(lowerQuery)) {
        return returnPlural(lowerQuery);
    }
    return "error";
}

function returnPlural(word) {
    var result = word;
    switch(word) {
        case "beach":
            result = "beaches";
            break;
        case "temple":
            result = "temples";
            break;
        case "country":
            result = "countries";
            break;
        default:
            break;
    }
    return result;
}
