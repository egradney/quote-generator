const quoteContainer = document.getElementById('quote-container');
const twitterButton = document.getElementById('twitter');
const quoteAuthor = document.getElementById('author');
const quoteText = document.getElementById('quote');
const quoteButton = document.getElementById('new-quote');
const random = (max) => Math.floor(Math.random() * max);
const loader = document.getElementById('loader');

let apiArray = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Retrieve new Quote
function newQuote() {
    showLoadingSpinner();
    try {
        let quote = apiArray[random(apiArray.length)];
        //Set Quote Text
        quoteText.textContent = quote.text;
        //Check to see if author is null & display Unkown or author 
        if (!quote.author) {
            quoteAuthor.textContent = 'Unknown';
        } else {
            quoteAuthor.textContent = quote.author; 
        }
        //Check quote length to determine styling
        if (quote.text.length > 10) {
            quoteText.classList.add('quote-container__text--long');
        } else {
            quoteText.classList.remove('quote-container__text--long');
        }
        //Hide Loader
    } catch (e){
        alert("Oops! Please reload the page.");
        quoteText.textContent = 'Please reload the page.';
        quoteAuthor.textContent = 'Quote Generator';
    }
    hideLoadingSpinner();
}

async function getData() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiArray = await response.json();
        newQuote();
    } catch (e) {
        alert("Oops! Please reload the page.");
        quoteText.textContent = 'Please reload the page.';
        quoteAuthor.textContent = 'Quote Generator';
    }
    
}


//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
quoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

getData();













// // Get Data FROM API THIS EVERYTHING IN ONE FUNCTIO INCLUDING GETTING THE NEW QUOTE
// async function getData() {
    
//     try {
//         const random = (max) => Math.floor(Math.random() * max);
//         const response = await fetch('https://type.fit/api/quotes');
//         apiArray = await response.json();
//         let i = await random(apiArray.length);
//         let data = await Object.values(apiArray[i]);
//         quoteAuthor.textContent = data[1];
//         quoteText.textContent = data[0];

//     } catch (e) {
//         alert(e)
//     }
    
// }

// //------ONLOAD----------
// getData();


// // Get Data FROM API ----TEST FUNCTION RETRIEVING VALUES
// async function getData(x) {
//     const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
//     let apiURL = x;
//     let apiArray = [];
//     try {
//         const response = await fetch(apiURL);
//         apiArray = await response.json();
//         let i = await random(0, apiArray.length);
//         //-------return single object--------
//         let data = await Object.values(apiArray[i]);
//         //-------destructure and update state below------
//         console.log(String(data))
//     } catch (e) {
//         alert(e)
//     }
    
// }

// //------ONLOAD----------
// getData('https://type.fit/api/quotes')