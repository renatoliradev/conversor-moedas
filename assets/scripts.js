document.querySelector('#inputValueToConvert').focus()

//#region VALIDATE SELECTS
let selectConvertFrom = document.querySelector('#selectConvertFrom')
let selectConvertTo = document.querySelector('#selectConvertTo')

let imgConvertedFrom = document.querySelector('#imgConvertFrom')
let textConvertedFrom = document.querySelector('#textConvertedFrom')
let valueConvertedFrom = document.querySelector('#valueConvertedFrom')

let imgConvertedTo = document.querySelector('#imgConvertTo')
let textConvertedTo = document.querySelector('#textConvertedTo')
let valueConvertedTo = document.querySelector('#valueConvertedTo')

const validateSelectionConvertFrom = () => {
    try {
        while (selectConvertTo.length > 0) selectConvertTo.remove(0)

        if (selectConvertFrom.value === "fromReal") {
            imgConvertedFrom.src = "./assets/img/real.png"
            valueConvertedFrom.textContent = "R$ 0,00"
            selectConvertTo.options[0] = new Option('$ Dólar Americano', 'toDolar');
            selectConvertTo.options[1] = new Option('€ Euro', 'toEuro');
            selectConvertTo.options[2] = new Option('BTC Bitcoin', 'toBitcoin');
        }
        else if (selectConvertFrom.value === "fromDolar") {
            imgConvertedFrom.src = "./assets/img/dolar.png"
            valueConvertedFrom.textContent = "$0,00"
            selectConvertTo.options[0] = new Option('R$ Real Brasileiro', 'toReal');
            selectConvertTo.options[1] = new Option('€ Euro', 'toEuro');
            selectConvertTo.options[2] = new Option('BTC Bitcoin', 'toBitcoin');
        }
        else if (selectConvertFrom.value === "fromEuro") {
            imgConvertedFrom.src = "./assets/img/euro.png"
            valueConvertedFrom.textContent = "0,00 €"
            selectConvertTo.options[0] = new Option('R$ Real Brasileiro', 'toReal');
            selectConvertTo.options[1] = new Option('$ Dólar Americano', 'toDolar');
            selectConvertTo.options[2] = new Option('BTC Bitcoin', 'toBitcoin');
        }
        else {
            selectConvertTo.options[0] = new Option('R$ Real Brasileiro', 'toReal');
            selectConvertTo.options[1] = new Option('$ Dólar Americano', 'toDolar');
            selectConvertTo.options[2] = new Option('€ Euro', 'toEuro');
            selectConvertTo.options[3] = new Option('BTC Bitcoin', 'toBitcoin');
        }
    }
    finally {
        validateSelectionConvertTo()
    }
}

const validateSelectionConvertTo = () => {
    try {
        if (selectConvertTo.value === "toReal") {
            imgConvertedTo.src = "./assets/img/real.png"
            valueConvertedTo.textContent = "R$ 0,00"
        }
        else if (selectConvertTo.value === "toDolar") {
            imgConvertedTo.src = "./assets/img/dolar.png"
            valueConvertedTo.textContent = "$0,00"
        }
        else if (selectConvertTo.value === "toEuro") {
            imgConvertedTo.src = "./assets/img/euro.png"
            valueConvertedTo.textContent = "0,00 €"
        }
        else {
            imgConvertedTo.src = "./assets/img/bitcoin.png"
            valueConvertedTo.textContent = "BTC 0"
        }
    }
    finally {

        convertCurrency()
    }
}

selectConvertFrom.addEventListener('change', validateSelectionConvertFrom)
selectConvertTo.addEventListener('change', validateSelectionConvertTo)

//#endregion

async function convertCurrency() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,BRL-USD,EUR-USD,BTC-USD,BRL-EUR,USD-EUR,BTC-EUR');
        const data = await response.json();

        let inputValueToConvert = Number(document.querySelector('#inputValueToConvert').value.replace(',', '.'))

        let realToDolar = (data.USDBRL.ask * inputValueToConvert)
        let realtoEuro = (data.EURBRL.ask * inputValueToConvert)
        let realtoBitcoin = (data.BTCBRL.ask * inputValueToConvert)

        let dolarToReal = (data.BRLUSD.ask * inputValueToConvert)
        let dolarToEuro = (data.EURUSD.ask * inputValueToConvert)
        let dolarToBitcoin = (data.BTCUSD.ask * inputValueToConvert)

        let euroToReal = (data.BRLEUR.ask * inputValueToConvert)
        let euroToDolar = (data.USDEUR.ask * inputValueToConvert)
        let euroToBitcoin = (data.BTCEUR.ask * inputValueToConvert)

        if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toDolar") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            valueConvertedTo.innerHTML = realToDolar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        }
        else if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toEuro") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            valueConvertedTo.innerHTML = realtoEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
        }
        else if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toBitcoin") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            valueConvertedTo.innerHTML = ('BTC ' + realtoBitcoin)
        }
        else if (selectConvertFrom.value === "fromDolar" && selectConvertTo.value === "toReal") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            valueConvertedTo.innerHTML = dolarToReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
        else if (selectConvertFrom.value === "fromDolar" && selectConvertTo.value === "toEuro") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            valueConvertedTo.innerHTML = dolarToEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
        }
        else if (selectConvertFrom.value === "fromDolar" && selectConvertTo.value === "toBitcoin") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            valueConvertedTo.innerHTML = ('BTC ' + dolarToBitcoin)
        }
        else if (selectConvertFrom.value === "fromEuro" && selectConvertTo.value === "toReal") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
            valueConvertedTo.innerHTML = euroToReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
        else if (selectConvertFrom.value === "fromEuro" && selectConvertTo.value === "toDolar") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
            valueConvertedTo.innerHTML = euroToDolar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        }
        else if (selectConvertFrom.value === "fromEuro" && selectConvertTo.value === "toBitcoin") {
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
            valueConvertedTo.innerHTML = ('BTC ' + euroToBitcoin)
        }
    }
    catch (err) {
        if (inputValueToConvert < 0)
            alert(err)
    }
}

document.querySelector('#btnConvert').addEventListener('click', convertCurrency)

document.addEventListener('keypress', function (e) {
    if (e.which == 13) {
        convertCurrency()
    }
}, false);