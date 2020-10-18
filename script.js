async function getQuote() {
	const randomNumber = Math.floor(Math.random() * 1642);
	const apiURL = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiURL);
		const data = await response.json();
		console.log(data[randomNumber]);
	} catch (error) {
		console.log(error);
	}
}

getQuote();
