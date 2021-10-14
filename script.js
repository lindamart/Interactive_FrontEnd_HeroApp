var flkrList = document.querySelector('ul');
var fetchButton = $('#imageSearchBtn')
var HTML_code = $('#HTML-Code');
var previewContainer = document.querySelector('#preview-container')
var quoteContainer = $('#quote-container')
var quoteApiKey = "dceb592dfa32b6976e23edb9faa390d4984c31e3"
var quoteOfDayUrl = `https://zenquotes.io/api/today/${quoteApiKey}`


// Functions
function getQuote() {
    fetch("https://type.fit/api/quotes")
    .then(res => {
        return res.json()
    })
    .then(data => {
        let chosenQuote = data[Math.floor(Math.random() * data.length)]
        console.log(chosenQuote.author)
        let author = ''
        if (chosenQuote.author == null){
            author = 'anonymous'
        } else {
            author = chosenQuote.author
        }
        quoteContainer.empty()
        quoteContainer.append(`"${chosenQuote.text}" -${author}`)
    })
}

function getImages() {
    var keyword = document.querySelector("#fetch-input").value

    var requestUrl = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&orientation=landscape&per_page=24`

    fetch(requestUrl, {
        headers: {
        "Authorization": "Client-ID ou_uv3FSxObsa26JuQwTEMxvsIjEHMNslk552sjVNt8",
        "Accept-Version": "v1",
        "Set-Cookie": "SameSite=None Secure"
        }})
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var photos = data.results

            // Loop over photos
            for (var i = 0; i < photos.length; i++) {
                var imgURL = photos[i].urls.regular
                
                // Created image element
                var flkrImg = $("<img>")
                flkrImg.addClass('flkrImgResult')
                
                // Changed the image source to the URL 
                flkrImg.attr("src", imgURL)
                
                // Attach image to image container
                $('.image-row').append(flkrImg)
            }
        });
}

// Generate HTML Code output based on content in preview
function generateHTML() {
    var inputTitle = $('#inputTitle').val()
    var inputSubtitle = $('#inputSubtitle').val()
    var inputContact = $('#inputContact').val()
    let dynamicHTML = `
    
    <textarea id="html" class="copy-button" readonly data-clipboard-target="#html"> 
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
`<textarea id="css" class="copy-button" readonly data-clipboard-target="#css">
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

// Initialize App
HTML_code.append(generateHTML())
getQuote()

// Event Listeners
$('#preview-container').on('keyup', function(){
    HTML_code.empty()
    HTML_code.append(generateHTML())
})

$('#quoteBtn').on('click', getQuote)

$('.image-row').on('click', '.flkrImgResult', function() {
    var imgURL = this.src
    $('#preview-container').css("background-image", `url(${imgURL})`);
    generateCSS(imgURL)
})

fetchButton.on('click', function() {
    $('.image-row').empty()
    getImages()
});


// Copy to Clipboard: any element with ".copy-button" class acts as a copy trigger and targets the data-clipboard-target property set on this "trigger"
var clipboard = new ClipboardJS('.copy-button');

// do someothing when the copy to clipboard triggers
clipboard.on('success', function(e) {
    console.log('Action:', e.action);
    console.log('Text:', e.text);
    console.log('Trigger:', e.trigger);

    e.clearSelection();
});

// do something when copy to clipboard fails
clipboard.on('error', function(e) {
    console.log('Action:', e.action);
    console.log('Trigger:', e.trigger);
});





// Hero
// Key:
// ff186f827916d3c42a8a2f504e5903d4

// Secret:
// 6435730407f220a2

