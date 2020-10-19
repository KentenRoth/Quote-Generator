const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter-button');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

async function getQuote() {
	showLoadingSpinner();
	const randomNumber = Math.floor(Math.random() * 1642);
	const apiURL = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiURL);
		const data = await response.json();
		const quote = data[randomNumber];
		if (quote.author.length === 0) {
			quoteAuthor.innerText = 'Unknown';
		}
		if (quote.text.length > 100) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = quote.text;
		quoteAuthor.innerText = quote.author;
		removeLoadingSpinner();
	} catch (error) {
		console.log(error);
	}
}

function tweetQuote() {
	const quote = quoteText.innerText;
	const author = quoteAuthor.innerText;
	const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterURL, '_blank');
}

newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuote();
