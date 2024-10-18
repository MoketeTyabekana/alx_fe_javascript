

let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];


  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
   
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - Category: ${randomQuote.category}</p>`;
  }


  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
   
    if (newQuoteText && newQuoteCategory) {
      
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      showRandomQuote();
    } else {
      alert('Please enter both a quote and a category.');
    }
  }


  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', addQuote);

// Initially show a random quote on page load
window.onload = showRandomQuote;