var flkrList = document.querySelector('ul');
var fetchButton = $('#imageSearchBtn')
var HTML_code = $('#HTML-Code');
var previewContainer = document.querySelector('#preview-container')

function getImages() {
    var testKeyword = document.querySelector("#fetch-input").value
    var requestUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ff186f827916d3c42a8a2f504e5903d4&tags=${testKeyword}&format=json&nojsoncallback=1`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var photos = data.photos.photo

            // Loop over photos
            for (var i = 0; i < 8; i++) {
                var imgURL = `https://live.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}.jpg`
                
                // Created image element
                var flkrImg = $("<img>")
                flkrImg.addClass('flkrImgResult')
                
                // Changed the image source to the URL 
                flkrImg.attr("src", imgURL)
                
                // When an image is clicked change the preview background image and CSS-code background URL
                // flkrImg.on('click', function() {
                //     $('#preview-container').css("background-image", `url(${imgURL})`);
                //     generateCSS(imgURL)
                // })
                
                // Attach image to image container
                $('#img-container').append(flkrImg)
            }
        });
}

$('#img-container').on('click', '.flkrImgResult', function() {
    var imgURL = this.src
    $('#preview-container').css("background-image", `url(${imgURL})`);
    generateCSS(imgURL)
})

fetchButton.on('click', function() {
    $('#img-container').empty()
    getImages()
});



// Generate HTML Code output based on content in preview
// TODO: look into cleaning up this function
function generateHTML() {
    var inputTitle = $('#inputTitle').val()
    var inputSubtitle = $('#inputSubtitle').val()
    var inputContact = $('#inputContact').val()
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
function generateCSS(url) {
    var template = 
`<textarea disabled>
.hero-image {
    background-image: url('${url}');
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}
    
.hero-text {
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
}

button {
    color: black;
	text-align: center;
	cursor: pointer;
	border: none;
}

</textarea>`;
    $('#CSS-Code').empty()
    $('#CSS-Code').append(template)
}

HTML_code.append(generateHTML())

$('#preview-container').on('keyup', function(){
    HTML_code.empty()
    HTML_code.append(generateHTML())
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

