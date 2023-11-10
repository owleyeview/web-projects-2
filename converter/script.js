const exchangeRates = {
    "base": "USD",
    "date": "2022-09-24",
    "rates": { 
      "AUD": 1.531863,
      "CAD": 1.36029,
      "CLP": 950.662057,
      "CNY": 7.128404,
      "EUR": 1.03203,
      "GBP": 0.920938,
      "INR": 81.255504,
      "JPY": 143.376504,
      "RUB": 57.875038,
      "ZAR": 17.92624
    } 
}

const currencySymbols = {
    "symbols": {
        "AUD": "Australian Dollar",
        "CAD": "Canadian Dollar",
        "CLP": "Chilean Peso",
        "CNY": "Chinese Yuan",
        "EUR": "Euro",
        "GBP": "British Pound Sterling",
        "INR": "Indian Rupee",
        "JPY": "Japanese Yen",
        "RUB": "Russian Ruble",
        "USD": "United States Dollar",
        "ZAR": "South African Rand"
    }
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    // Handle the case where fromCurrency or toCurrency is not in exchangeRates.rates
    if (fromCurrency !== 'USD' && !exchangeRates.rates[fromCurrency]) {
        document.getElementById("conversionResult").innerHTML = "Invalid source currency code provided.";
        return;  // Exit the function early
    }

    if (toCurrency !== 'USD' && !exchangeRates.rates[toCurrency]) {
        document.getElementById("conversionResult").innerHTML = "Invalid target currency code provided.";
        return;  // Exit the function early
    }

    // Convert the amount string to a number
    amount = parseFloat(amount);

    // Convert the amount to USD first
    let amountInUSD = fromCurrency === 'USD' ? amount : amount / exchangeRates.rates[fromCurrency];

    // Convert from USD to the target currency
    let convertedAmount = toCurrency === 'USD' ? amountInUSD : amountInUSD * exchangeRates.rates[toCurrency];
    
    // Display the conversion result directly in the div
    document.getElementById("conversionResult").innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency} (as of ${exchangeRates.date})`;
}



function lookupCurrency(query) {
    let results = [];

    // search for matching string in currency codes or currency names
    for (let code in currencySymbols.symbols) {
        if (code.toLowerCase().includes(query.toLowerCase()) || currencySymbols.symbols[code].toLowerCase().includes(query.toLowerCase())) {
            results.push(code);
        }
    }

    if (results.length === 0) {
        document.getElementById("lookupResult").innerHTML = "No matching currency found";
        return;  // Exit the function early
    }

    document.getElementById("lookupResult").innerHTML = results.join(', ');
}