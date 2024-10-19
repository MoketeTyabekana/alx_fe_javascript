

let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];


  
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}


function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}


  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - Category: ${randomQuote.category}</p>`;

    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote)); 
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

  // Function to create and display the form for adding new quotes
function createAddQuoteForm() {
 
  const formContainer = document.createElement('div');
  const inputText = document.createElement('input');
  inputText.id = 'newQuoteText';
  inputText.type = 'text';
  inputText.placeholder = 'Enter a new quote';

  const inputCategory = document.createElement('input');
  inputCategory.id = 'newQuoteCategory';
  inputCategory.type = 'text';
  inputCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.innerText = 'Add Quote';
  addButton.onclick = addQuote;


  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  
  document.body.appendChild(formContainer);
}


window.onload = function() {
  showRandomQuote();
  createAddQuoteForm();
};



  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', addQuote);

// Initially show a random quote on page load
window.onload = showRandomQuote;