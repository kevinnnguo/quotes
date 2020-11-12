const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector('#loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get quote from API
async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    showLoadingSpinner();
    const response = await fetch(proxyUrl + apiUrl, {
      method: "GET",
      headers: {
        Origin: "",
        "X-Requested-With": "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        authorText.innerText =
          data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;

        if (data.quoteText.length > 50) {
          quoteText.classList.add("long-quote");
        } else {
          quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
      });
  } catch (error) {
    console.log(error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
 getQuote();

