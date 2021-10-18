var fetchButton = $('#imageSearchBtn')
var HTML_code = $('#HTML-Code');
var quoteContainer = $('#quote-container')


// Functions
function getQuote() {
    fetch("https://type.fit/api/quotes")
        .then(res => {
            return res.json()
        })
        .then(data => {
            // Choose a random quote from quote array (data comes back as an array of objects which contain text and author)
            let chosenQuote = data[Math.floor(Math.random() * data.length)]
            let author = ''
            if (chosenQuote.author == null) {
                author = 'anonymous'
            } else {
                author = chosenQuote.author
            }

            quoteContainer.addClass('animate__fadeIn')
            setTimeout(() => {
                quoteContainer.removeClass('animate__fadeIn')
            }, 1000)

            quoteContainer.empty()
            quoteContainer.append(`"${chosenQuote.text}" -${author}`)
        })
}

function getImages() {
    // Make API call based on what the user has put into the input field
    var keyword = $("#fetch-input").val()
    var requestUrl = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&orientation=landscape&per_page=24`
    fetch(requestUrl, {
        headers: {
            "Authorization": "Client-ID ou_uv3FSxObsa26JuQwTEMxvsIjEHMNslk552sjVNt8",
            "Accept-Version": "v1",
            "Set-Cookie": "SameSite=None Secure"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var photos = data.results

            // Loop over photos
            for (var i = 0; i < photos.length; i++) {
                var imgURL = photos[i].urls.regular

                // Creat image element
                var imgDiv = $('<div>')
                imgDiv.addClass('imgDiv')
                var img = $("<img>")
                img.attr('alt', photos[i].alt_description)
                img.addClass('imgResult')

                // Change the image source to the URL 
                img.attr("src", imgURL)

                imgDiv.append(img)

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
html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}

.hero-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${url}');
    height: 100%;
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


// Theme switcher functions
function addBatmanClasses() {
    // Remove superman classes
    $('body').removeClass('superman-blue')
    $('main').removeClass('superman-blue')
    $('#search-container').removeClass('superman-red')
    $('#preview-container').removeClass('superman-red')
    $('#template-container').removeClass('superman-yellow')
    $('#HTML-Code').removeClass('superman-red')
    $('#CSS-Code').removeClass('superman-red')
    $('.hero-image').removeClass('superman-image')
    $('footer').removeClass('superman-red')

    // Remove green-lantern classes
    $('body').removeClass('green-lantern-green')
    $('main').removeClass('green-lantern-green')
    $('#search-container').removeClass('green-lantern-green')
    $('#preview-container').removeClass('green-lantern-green')
    $('#template-container').removeClass('green-lantern-dark')
    $('#HTML-Code').removeClass('green-lantern-green')
    $('#CSS-Code').removeClass('green-lantern-green')
    $('.hero-image').removeClass('green-lantern-image')
    $('footer').removeClass('green-lantern-dark')

    // Add batman classes
    $('body').addClass('batman-dark')
    $('main').addClass('batman-dark')
    $('#search-container').addClass('batman-dark')
    $('#preview-container').addClass('batman-dark')
    $('#template-container').addClass('batman-yellow')
    $('#HTML-Code').addClass('batman-yellow')
    $('#CSS-Code').addClass('batman-yellow')
    $('.hero-image').addClass('batman-image')
    $('footer').addClass('batman-yellow')
    $('.hero-text a').css('color', '#ffed10')
    localStorage.setItem("theme", "batman");
}

function addSupermanClasses() {
    // Remove batman classes
    $('body').removeClass('batman-dark')
    $('main').removeClass('batman-dark')
    $('#search-container').removeClass('batman-dark')
    $('#preview-container').removeClass('batman-dark')
    $('#template-container').removeClass('batman-yellow')
    $('#HTML-Code').removeClass('batman-yellow')
    $('#CSS-Code').removeClass('batman-yellow')
    $('.hero-image').removeClass('batman-image')
    $('footer').removeClass('batman-yellow')

    // Remove green-lantern classes
    $('body').removeClass('green-lantern-green')
    $('main').removeClass('green-lantern-green')
    $('#search-container').removeClass('green-lantern-green')
    $('#preview-container').removeClass('green-lantern-green')
    $('#template-container').removeClass('green-lantern-dark')
    $('#HTML-Code').removeClass('green-lantern-green')
    $('#CSS-Code').removeClass('green-lantern-green')
    $('.hero-image').removeClass('green-lantern-image')
    $('footer').removeClass('green-lantern-dark')

    // Add superman classes
    $('body').addClass('superman-blue')
    $('main').addClass('superman-blue')
    $('#search-container').addClass('superman-red')
    $('#preview-container').addClass('superman-red')
    $('#template-container').addClass('superman-yellow')
    $('#HTML-Code').addClass('superman-red')
    $('#CSS-Code').addClass('superman-red')
    $('.hero-image').addClass('superman-image')
    $('footer').addClass('superman-red')
    $('.hero-text a').css('color', '#e20025')
    localStorage.setItem("theme", "superman");
}

function addGreenLanternClasses() {
    // Remove batman classes
    $('body').removeClass('batman-dark')
    $('main').removeClass('batman-dark')
    $('#search-container').removeClass('batman-dark')
    $('#preview-container').removeClass('batman-dark')
    $('#template-container').removeClass('batman-yellow')
    $('#HTML-Code').removeClass('batman-yellow')
    $('#CSS-Code').removeClass('batman-yellow')
    $('.hero-image').removeClass('batman-image')
    $('footer').removeClass('batman-yellow')

    // Removes superman classes
    $('body').removeClass('superman-blue')
    $('main').removeClass('superman-blue')
    $('#search-container').removeClass('superman-red')
    $('#preview-container').removeClass('superman-red')
    $('#template-container').removeClass('superman-yellow')
    $('#HTML-Code').removeClass('superman-red')
    $('#CSS-Code').removeClass('superman-red')
    $('.hero-image').removeClass('superman-image')
    $('footer').removeClass('superman-red')

    // Add green-lantern classes
    $('body').addClass('green-lantern-green')
    $('main').addClass('green-lantern-green')
    $('#search-container').addClass('green-lantern-green')
    $('#preview-container').addClass('green-lantern-green')
    $('#template-container').addClass('green-lantern-dark')
    $('#HTML-Code').addClass('green-lantern-green')
    $('#CSS-Code').addClass('green-lantern-green')
    $('.hero-image').addClass('green-lantern-image')
    $('footer').addClass('green-lantern-dark')
    $('.hero-text a').css('color', '#4dff67')
    localStorage.setItem("theme", "green-lantern");
}


window.onload = checkTheme();
function checkTheme() {
    const theme = localStorage.getItem("theme");

    // If local storage is not null, check to see what theme is set to and run corresponding function
    if (theme !== null) {
        if (theme === "batman") {
            addBatmanClasses()
        }else if (theme === "superman"){
            addSupermanClasses()
        }else if (theme === "green-lantern") {
            addGreenLanternClasses()
        }
    }else {
        localStorage.setItem("theme", "batman")
    }
}

// Initialize App
HTML_code.append(generateHTML())
getQuote()

// Add theme classes
$('#batman').on('click', addBatmanClasses)
$('#superman').on('click', addSupermanClasses)
$('#green-lantern').on('click', addGreenLanternClasses)

// Add chosen image to preview and to CSS codeblock
$('.image-row').on('click', '.imgResult', function () {
    var imgURL = this.src
    $('#preview-container').css("background-image", `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgURL})`);
    generateCSS(imgURL)
})

// Get a new quote on button click
$('#quoteBtn').on('click', getQuote)

// Fetch images
fetchButton.on('click', function () {
    $('.image-row').empty()
    getImages()
});


// Codeblock modal + slide in/out effects
$('#viewCodeBtn').on('click', () => {
    HTML_code.empty()
    HTML_code.append(generateHTML())
    $('.codeblock-modal .modal-content').removeClass('animate__fadeOutLeft')
    $('.codeblock-modal .modal-content').addClass('animate__fadeInLeft')
    $('.codeblock-modal.modal').addClass('is-active');
})
$('.codeblock-modal .modal-close').on('click', () => {
    $('.codebock-modal .modal-content').removeClass('animate__fadeInLeft')
    $('.codeblock-modal .modal-content').addClass('animate__fadeOutLeft')
    // Delay removing the is-active class until the fade out animation is complete
    setTimeout(() => {
        $('.codeblock-modal.modal').removeClass('is-active');
    }, 1000)
})
$('.codeblock-modal .modal-background').on('click', () => {
    $('.codeblock-modal .modal-content').removeClass('animate__fadeInLeft')
    $('.codeblock-modal .modal-content').addClass('animate__fadeOutLeft')
    // Delay removing the is-active class until the fade out animation is complete
    setTimeout(() => {
        $('.codeblock-modal.modal').removeClass('is-active');
    }, 1000)
})



// Copy to Clipboard: any element with ".copy-button" class acts as a copy trigger and targets the data-clipboard-target property set on this "trigger"
var clipboard = new ClipboardJS('.copy-button');

// Show message when clipboard succeeds
clipboard.on('success', function (e) {
    $('#copy-notification').text('Codeblock copied to clipboard!').css('display', 'block').removeClass('animate__fadeOut').addClass('animate__fadeIn')
    setTimeout(() => {
        $('#copy-notification').removeClass('animate__fadeIn').addClass('animate__fadeOut')
    }, 1000)

    e.clearSelection();
});

// Show message when clipboard fails
clipboard.on('error', function (e) {
    $('#copy-notification').text('Press CTRL/CMD + C to Copy!').css('display', 'block').removeClass('animate__fadeOut').addClass('animate__fadeIn')
    setTimeout(() => {
        $('#copy-notification').removeClass('animate__fadeIn').addClass('animate__fadeOut')
    }, 2000)
});



// Instructions modal intersection observer and fade in out animations
const heroTitle = document.querySelector('#hero-title')

const options = {
    threshold: 1,
    rootMargin: '0px 0px -200px 0px'
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log('intersecting')

                $('.message-modal').addClass('is-active')
                $('.message-modal .modal-content').addClass('animate__fadeInLeft')


            observer.unobserve(heroTitle)
        }
    })
}, options)

observer.observe(heroTitle)

$('.message-modal .modal-close').on('click', () => {
    $('.message-modal .modal-content').removeClass('animate__fadeInLeft')
    $('.message-modal .modal-content').addClass('animate__fadeOutLeft')
    // Delay removing the is-active class until the fade out animation is complete
    setTimeout(() => {
        $('.message-modal').removeClass('is-active');
    }, 1000)
})

$('.message-modal .modal-background').on('click', () => {
    $('.message-modal .modal-content').removeClass('animate__fadeInLeft')
    $('.message-modal .modal-content').addClass('animate__fadeOutLeft')
    // Delay removing the is-active class until the fade out animation is complete
    setTimeout(() => {
        $('.message-modal').removeClass('is-active');
    }, 1000)
})

