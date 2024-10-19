let quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    category: "Success",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - Category: ${randomQuote.category}</p>`;

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));

  function loadLastViewedQuote() {
    const lastQuote = sessionStorage.getItem("lastQuote");
    if (lastQuote) {
      const quote = JSON.parse(lastQuote);
      document.getElementById(
        "quoteDisplay"
      ).innerHTML = `<p>"${quote.text}" - Category: ${quote.category}</p>`;
    }
  }

  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();

      populateCategories();

      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";

      showRandomQuote();
    } else {
      alert("Please enter both a quote and a category.");
    }
  }

  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const uniqueCategories = [
      ...new Set(quotes.map((quote) => quote.category)),
    ];

    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    uniqueCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");

    const filteredQuotes =
      selectedCategory === "all"
        ? quotes
        : quotes.filter((quote) => quote.category === selectedCategory);

    if (filteredQuotes.length > 0) {
      quoteDisplay.innerHTML = `<p>"${filteredQuotes[0].text}" - Category: ${filteredQuotes[0].category}</p>`;
    } else {
      quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
    }

    localStorage.setItem("lastSelectedCategory", selectedCategory);
  }

  function loadLastSelectedCategory() {
    const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
    if (lastSelectedCategory) {
      document.getElementById("categoryFilter").value = lastSelectedCategory;
      filterQuotes();
    }
  }

  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    const inputText = document.createElement("input");
    inputText.id = "newQuoteText";
    inputText.type = "text";
    inputText.placeholder = "Enter a new quote";

    const inputCategory = document.createElement("input");
    inputCategory.id = "newQuoteCategory";
    inputCategory.type = "text";
    inputCategory.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.innerText = "Add Quote";
    addButton.onclick = addQuote;

    formContainer.appendChild(inputText);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
  }

  function exportToJson() {
    const jsonQuotes = JSON.stringify(quotes);
    const blob = new Blob([jsonQuotes], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    };

    fileReader.readAsText(event.target.files[0]);
  }

  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  document.getElementById("addQuote").addEventListener("click", addQuote);
  document
    .getElementById("exportQuotes")
    .addEventListener("click", exportToJson);

  window.onload = function () {
    loadQuotes();
    populateCategories();
    loadLastSelectedCategory();
    loadLastViewedQuote();
    createAddQuoteForm();
  };
}



async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const serverQuotes = await response.json();
  return serverQuotes;
}

setInterval(async () => {
  const serverQuotes = await fetchQuotesFromServer();
  syncQuotesWithServer(serverQuotes);
}, 60000);


function notifySyncSuccess() {
  alert('Quotes synced with server!');
}

function syncQuotesWithServer(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  
  const updatedQuotes = [...serverQuotes, ...localQuotes.filter(localQuote => {
    return !serverQuotes.find(serverQuote => serverQuote.id === localQuote.id);
  })];

  localStorage.setItem('quotes', JSON.stringify(updatedQuotes));

  notifySyncSuccess();
}

async function addQuoteToServer(quote) {
  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(quote),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const newQuote = { text: 'New quote text', category: 'Category' };
addQuoteToServer(newQuote);


function resolveConflicts(serverQuotes, localQuotes) {
  
  const resolvedQuotes = serverQuotes.concat(localQuotes.filter(localQuote => {
    return !serverQuotes.some(serverQuote => serverQuote.id === localQuote.id);
  }));
  
  return resolvedQuotes;
}

function notifyConflictResolution() {
  alert('Conflict detected! Data from the server has taken precedence.');
}



