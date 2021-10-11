var flkrList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var HTML_code = document.querySelector('#HTML-Code');


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

