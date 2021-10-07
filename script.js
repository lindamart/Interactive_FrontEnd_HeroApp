// console.log("Am I connected?")

var flkrList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
    var requestUrl = 'https://api.githhttps://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff186f827916d3c42a8a2f504e5903d4&tags=get+recent&extras=&per_page=6&page=&format=json&nojsoncallback=1ub.com/users/amaddatu/repos';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var listItem = document.createElement('li');

                listItem.textContent = data[i].html_url;
                flkrList.appendChild(listItem);
            }
        });
}

fetchButton.addEventListener('click', getApi);

// Hero
// Key:
// ff186f827916d3c42a8a2f504e5903d4

// Secret:
// 6435730407f220a2