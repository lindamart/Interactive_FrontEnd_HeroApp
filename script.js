var flkrList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var HTML_code = document.querySelector('#HTML-Code');


function getApi(rsp) {
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


// Generate HTML Code output based on content in preview
// TODO: look into cleaning up this function
var generateHTML = function() {
    var inputTitle = document.querySelector('#inputTitle').value
    var inputSubtitle = document.querySelector('#inputSubtitle').value
    var inputContact = document.querySelector('#inputContact').value
    let dynamicHTML = `
    
    <textarea disabled> 
            <div class="hero-image">
                <div class="hero-text">
                    <h1>${inputTitle}</h1>
                    <p>${inputSubtitle}</p>
                    <button>${inputContact}</button>
                </div>
            </div>
    </textarea>
    `;
    return dynamicHTML
}

// Generate CSS Code output based on content in preview
// const generateCSS = (url) => {
//     var template = 
// `<pre>
// .hero-image {
//     background-image: url('${url}');
//     height: 100vh;
//     background-position: center;
//     background-repeat: no-repeat;
//     background-size: cover;
//     position: relative;
// }
    
// .hero-text {
//     text-align: center;
//     position: absolute;
//     display: flex;
//     flex-direction: column;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     color: white;
// }

// button {
//     color: black;
// 	text-align: center;
// 	cursor: pointer;
// 	border: none;
// 	width: 50%;
// }

// </pre`;
//     #CSS-Code.innerHTML = ''
//     #CSS-Code.innerHTML = template
// }

HTML_code.innerHTML = generateHTML()

document.querySelector('#preview-container').addEventListener('keyup', function(){
    HTML_code.innerHTML = '';
    HTML_code.innerHTML = generateHTML()
})





// THIS IS A SAMPLE I FOUND FOR THE CALL BUT I CANNOT FIGURE OUT HOW TO USE IT 

// function jsonFlickrApi(rsp) {
// window.rsp = rsp;
// var s = "";
// // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
// // http://www.flickr.com/photos/{user-id}/{photo-id}
// s = "total number is: " + rsp.photos.photo.length + "<br/>";

// for (var i = 0; i < rsp.photos.photo.length; i++) {
//     photo = rsp.photos.photo[i];
//     t_url = "https://live" + photo.photo + ".static.flickr.com/" +
//         photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
//     p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
//     s += '<a href="' + p_url + '">' + '<img alt="' + photo.title +
//         '"src="' + t_url + '"/>' + '</a>';
// }



// Hero
// Key:
// ff186f827916d3c42a8a2f504e5903d4

// Secret:
// 6435730407f220a2