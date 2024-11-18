const calculateButton = document.getElementById("calculate");
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from");
const toCurrencySelect = document.getElementById("to");
const outputElement = document.getElementById("output");

// Populate currency options
const populateCurrencyOptions = async () => {
  try {
    const response = await fetch('https://v6.exchangerate-api.com/v6/814385ebe55498d47ded4e4f/currencies');
    const data = await response.json();
    const currencies = Object.keys(data.supported_codes);
    
    currencies.forEach(currency => {
      const optionFrom = document.createElement('option');
      optionFrom.value = currency;
      optionFrom.textContent = currency;
      fromCurrencySelect.appendChild(optionFrom);
      
      const optionTo = document.createElement('option');
      optionTo.value = currency;
      optionTo.textContent = currency;
      toCurrencySelect.appendChild(optionTo);
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
};

// Calculate conversion rate
const calculateConversion = async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrencySelect.value;
  const to = toCurrencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/814385ebe55498d47ded4e4f/latest/${from}`);
    const data = await response.json();
    const conversionRate = data.conversion_rates[to];
    
    if (conversionRate !== undefined) {
      const result = amount * conversionRate;
      outputElement.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
      outputElement.style.display = "block";
    } else {
      alert("Invalid currency selection");
    }
  } catch (error) {
    alert("An error occurred while fetching the conversion rate");
  }
};

// Initialize currency options and event listeners
populateCurrencyOptions();
calculateButton.addEventListener("click", calculateConversion);
