// console.log("Am I connected?")

var flkrList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
    // Looks like you got 99% of the way there!  I think you just had a few mistaken copy and pastes in the URL below.  Check out how I revised below 
    // var requestUrl = 'https://api.githhttps://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff186f827916d3c42a8a2f504e5903d4&tags=get+recent&extras=&per_page=6&page=&format=json&nojsoncallback=1ub.com/users/amaddatu/repos';

    var testKeyword = "ocean"
    var requestUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff186f827916d3c42a8a2f504e5903d4&tags=${testKeyword}&format=json&nojsoncallback=1`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Once you get the data console logged above you will see that the actual photos array can be accessed by the property ".photos" followed by ".photo" (strange that they named the array of photos "photo"!)
            var photos = data.photos.photo

            // Loop over photos (I am only pulling 8 here so we don't loop through and render all results)
            for (var i = 0; i < 8; i++) {
                var listItem = document.createElement('li');

                // I believe you were setting textContent to .html_url, however, that property does not exist on these photo objects.  Console.log the photos array and check out the properties on each photo (pulling just title for now to get something on the screen).  To actually build an image it looks like flickr uses a URL string that includes "server", "id", and "secret", all which are properties on each photo object.  I found this in the flickr documentation under URLs:

                // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg

                listItem.textContent = photos[i].title
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