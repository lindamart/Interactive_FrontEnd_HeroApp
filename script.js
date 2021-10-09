// console.log("Am I connected?")

var flkrList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

function getApi(rsp) {
       var testKeyword = document.querySelector("#fetch-input").value
    var requestUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff186f827916d3c42a8a2f504e5903d4&tags=${testKeyword}&format=json&nojsoncallback=1`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var photos = data.photos.photo

            // Loop over photos
            for (var i = 0; i < 8; i++) {
                var listItem = document.createElement('li');
                console.log(photos[i])
                photos[i].id
                photos[i].server
                photos[i].secret
                var url = `https://live.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}.jpg`
                console.log(url)
                
                // Created image element
                var flkrImg = $("<img>")
                
                // Changed the image source to the URL 
                flkrImg.attr("src",url)

                // Get photo names
                fetch
                listItem.textContent = photos[i].title
                
                // Attached image to list
                flkrImg.appendTo(flkrList)

                // Attached list title 
                flkrList.appendChild(listItem);
            }
        });
}

fetchButton.addEventListener('click', getApi);
