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
                var imgDiv = $('<div>')
                imgDiv.addClass('imgDiv')

                var flkrImg = $("<img>")
                flkrImg.addClass('flkrImgResult')
                
                // Changed the image source to the URL 
                flkrImg.attr("src", imgURL)

                imgDiv.append(flkrImg)
                
                // Attach image to image container
                $('.image-row').append(imgDiv)
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

// Theme switcher
function addBatmanClasses () {
    // Remove superman classes
    $('body').removeClass('superman-blue')
    $('#head-container').removeClass('superman-blue')
    $('#search-container').removeClass('superman-red')
    $('#preview-container').removeClass('superman-red')
    $('#template-container').removeClass('superman-yellow')

    // Remove green-lantern classes
    $('body').removeClass('green-lantern-green')
    $('#head-container').removeClass('green-lantern-green')
    $('#search-container').removeClass('green-lantern-green')
    $('#preview-container').removeClass('green-lantern-green')
    $('#template-container').removeClass('green-lantern-dark')

    // Add batman classes
    $('body').addClass('batman-dark')
    $('#head-container').addClass('batman-dark')
    $('#search-container').addClass('batman-dark')
    $('#preview-container').addClass('batman-dark')
    $('#template-container').addClass('batman-yellow')

}

function addSupermanClasses () {
    // Remove batman classes
    $('body').removeClass('batman-dark')
    $('#head-container').removeClass('batman-dark')
    $('#search-container').removeClass('batman-dark')
    $('#preview-container').removeClass('batman-dark')
    $('#template-container').removeClass('batman-yellow')

    // Remove green-lantern classes
    $('body').removeClass('green-lantern-green')
    $('#head-container').removeClass('green-lantern-green')
    $('#search-container').removeClass('green-lantern-green')
    $('#preview-container').removeClass('green-lantern-green')
    $('#template-container').removeClass('green-lantern-dark')

     // Add superman classes
     $('body').addClass('superman-blue')
     $('#head-container').addClass('superman-blue')
     $('#search-container').addClass('superman-red')
     $('#preview-container').addClass('superman-red')
     $('#template-container').addClass('superman-yellow')
}

function addGreenLanterClasses () {
    // Remove batman classes
    $('body').removeClass('batman-dark')
    $('#head-container').removeClass('batman-dark')
    $('#search-container').removeClass('batman-dark')
    $('#preview-container').removeClass('batman-dark')
    $('#template-container').removeClass('batman-yellow')

    // Removes superman classes
    $('body').removeClass('superman-blue')
    $('#head-container').removeClass('superman-blue')
    $('#search-container').removeClass('superman-red')
    $('#preview-container').removeClass('superman-red')
    $('#template-container').removeClass('superman-yellow')

    // Add green-lantern classes
    $('body').addClass('green-lantern-green')
    $('#head-container').addClass('green-lantern-green')
    $('#search-container').addClass('green-lantern-green')
    $('#preview-container').addClass('green-lantern-green')
    $('#template-container').addClass('green-lantern-dark')
}


$('#batman').on('click', addBatmanClasses)
$('#superman').on('click', addSupermanClasses)
$('#green-lantern').on('click', addGreenLanterClasses)

// change page title green on-click
// document.getElementById("green-lanter").onclick = switchGreen () {
//     document.getElementById("page-title").style.color = "greenyellow";
// }


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

$('#viewCodeBtn').on('click', () => {
    $('.modal').addClass('is-active');
})

$('.modal-close').on('click', () => {
    $('.modal').removeClass('is-active');
})

$('.modal-background').on('click', () => {
    $('.modal').removeClass('is-active');
})



// Copy to Clipboard: any element with ".copy-button" class acts as a copy trigger and targets the data-clipboard-target property set on this "trigger"
var clipboard = new ClipboardJS('.copy-button');

// do someothing when the copy to clipboard triggers
clipboard.on('success', function(e) {
    $('#copy-notification').text('Codeblock copied to clipboard!').css('display', 'block')
    setTimeout(() => {
        $('#copy-notification').text('').css('display', 'none')
    }, 2000)

    e.clearSelection();
});

// do something when copy to clipboard fails
clipboard.on('error', function(e) {
    $('#copy-notification').text('Press CTRL/CMD + C to Copy!').css('display', 'block')
    setTimeout(() => {
        $('#copy-notification').text('').css('display', 'none')
    }, 2000)
});





// Hero
// Key:
// ff186f827916d3c42a8a2f504e5903d4

// Secret:
// 6435730407f220a2

// const getSuperheroQuote = () => {
//     fetch('https://superhero-quotes.herokuapp.com/grab?banner=dcu', {headers: {
//         "mode": "no-cors"
//     }})
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         console.log(data)
//     })
// }

// getSuperheroQuote()









