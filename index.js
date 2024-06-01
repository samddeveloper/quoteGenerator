// Add an event listener to the DOMContentLoaded event, which is fired when the
// initial HTML document has been completely loaded and parsed, without waiting
// for stylesheets, images, and subframes to finish loading
document.addEventListener('DOMContentLoaded', () => {
    // Select the advice element, advice number element, advice button, and card
    // container using their respective IDs
    const adviceElement = document.getElementById('advice');
    const adviceNumber = document.getElementById('adviceNumber');
    const adviceButton = document.getElementById('quoteButton');
    const cardContainer = document.querySelector('.card-container');

    // Add a click event listener to the advice button, which will fetch a new
    // piece of advice from the API and display it on the screen when clicked
    adviceButton.addEventListener('click', fetchAdvice);

    // Define the fetchAdvice function, which fetches a new piece of advice from
    // the API and displays it on the screen
    async function fetchAdvice() {
        try {
            // Fetch the advice from the API using the fetch function, which
            // returns a Promise that resolves to the Response object returned
            // by the API
            const res = await fetch('https://api.adviceslip.com/advice');

            // Check if the response was successful (status in the range 200-299)
            if (!res.ok) {
                // If the response was not successful, throw an error with a
                // message indicating that the network response was not ok
                throw new Error('Network response was not ok');
            }

            // Parse the response as JSON and extract the advice and ID from the
            // resulting object
            const data = await res.json();
            const advice = data.slip.advice;
            const id = data.slip.id;

            // Set the text content of the advice element and advice number
            // element to the fetched advice and ID, respectively
            adviceElement.textContent = `"${advice}"`;
            adviceNumber.textContent = `ADVICE #${id}`;

            // Adjust the height of the card container based on the length of
            // the advice text
            adjustText();
        } catch (error) {
            // If there was an error fetching the advice, log the error to the
            // console and return null
            console.error('There was a problem with the fetch operation', error);
            return null;
        }
    }

// Define the adjustText function, which adjusts the text size based on the length of the advice text
function adjustText() {
    // Define the maximum number of characters before the text size needs to be adjusted
    const maxCharacters = 90;

    // Get the text content of the advice element and remove any extra whitespace
    const text = adviceElement.textContent.trim();

    // If the length of the text is greater than the maximum number of characters
    if (text.length > maxCharacters) {
        // Calculate the new font size based on the number of characters in the text
        // Increase the font size more gradually
        const newFontSize = 100 - ((text.length - maxCharacters) * 0.2);

        // Set the font size of the advice element to the new font size
        adviceElement.style.fontSize = `${newFontSize}%`;
    } else {
        // If the length of the text is less than or equal to the maximum number of characters
        // Reset the font size of the advice element to its default value
        adviceElement.style.fontSize = '';
    }
}




    // Fetch a piece of advice when the page is loaded for the first time
    fetchAdvice();
});

