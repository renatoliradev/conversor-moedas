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
    while (selectConvertTo.length > 0) selectConvertTo.remove(0)

    if (selectConvertFrom.value === "fromReal") {
        imgConvertedFrom.src = "./assets/img/real.png"
        textConvertedFrom.textContent = "Real Brasileiro"
        valueConvertedFrom.textContent = ""
        selectConvertTo.options[0] = new Option('$ Dólar Americano', 'toDolar');
        selectConvertTo.options[1] = new Option('€ Euro', 'toEuro');
        selectConvertTo.options[2] = new Option('BTC Bitcoin', 'toBitcoin');
    }
    else if (selectConvertFrom.value === "fromDolar") {
        imgConvertedFrom.src = "./assets/img/dolar.png"
        textConvertedFrom.textContent = "Dólar Americano"
        valueConvertedFrom.textContent = "$ 0,00"
        selectConvertTo.options[0] = new Option('R$ Real Brasileiro', 'toReal');
        selectConvertTo.options[1] = new Option('€ Euro', 'toEuro');
        selectConvertTo.options[2] = new Option('BTC Bitcoin', 'toBitcoin');
    }
    else if (selectConvertFrom.value === "fromEuro") {
        imgConvertedFrom.src = "./assets/img/euro.png"
        textConvertedFrom.textContent = "Euro"
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
    validateSelectionConvertTo()
}

const validateSelectionConvertTo = () => {
    if (selectConvertTo.value === "toReal") {
        imgConvertedTo.src = "./assets/img/real.png"
        textConvertedTo.textContent = "Real Brasileiro"
        valueConvertedTo.textContent = "R$ 0,00"
    }
    else if (selectConvertTo.value === "toDolar") {
        imgConvertedTo.src = "./assets/img/dolar.png"
        textConvertedTo.textContent = "Dólar Americano"
        valueConvertedTo.textContent = "$ 0,00"
    }
    else if (selectConvertTo.value === "toEuro") {
        imgConvertedTo.src = "./assets/img/euro.png"
        textConvertedTo.textContent = "Euro"
        valueConvertedTo.textContent = "0,00 €"
    }
    else {
        imgConvertedTo.src = "./assets/img/bitcoin.png"
        textConvertedTo.textContent = "Bitcoin"
        valueConvertedTo.textContent = "BTC 0,00"
    }
}

selectConvertFrom.addEventListener('change', validateSelectionConvertFrom)
selectConvertTo.addEventListener('change', validateSelectionConvertTo)

//#endregion

async function convertCurrency() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,BRL-USD,EUR-USD,BTC-USD,BRL-EUR,USD-EUR,BTC-EUR');
        const data = await response.json();

        let realToDolar = data.USDBRL.ask.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let realtoEuro = data.EURBRL.ask
        let realtoBitcoin = data.BTCBRL.ask

        let dolarToReal = data.BRLUSD.ask
        let dolarToEuro = data.EURUSD.ask
        let dolarToBitcoin = data.BTCUSD.ask

        let euroToReal = data.BRLEUR.ask
        let euroToDolar = data.USDEUR.ask
        let euroToBitcoin = data.BTCEUR.ask


        if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toDolar") {
            var inputValueToConvert = document.querySelector('#inputValueToConvert').value
            
            valueConvertedFrom.innerHTML = inputValueToConvert.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            valueConvertedTo.innerHTML = (realToDolar * inputValueToConvert)
        }
        else if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toEuro") {
            valueConvertedTo.textContent = (realtoEuro * inputValueToConvert)
        }
        else if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toBitcoin") {
            valueConvertedTo.textContent = (realtoBitcoin * inputValueToConvert)
        }
        else if (selectConvertFrom.value === "fromDolar" && selectConvertTo.value === "toReal") {
            valueConvertedTo.textContent = (dolarToReal * inputValueToConvert)
        }
        else if (selectConvertFrom.value === "fromDolar" && selectConvertTo.value === "toEuro") {
            console.log('conversao de dolar para euro')
        }
        else if (selectConvertFrom.value === "fromDolar" && selectConvertTo.value === "toBitcoin") {
            console.log('conversao de dolar para bitcoin')
        }
        else if (selectConvertFrom.value === "fromEuro" && selectConvertTo.value === "toReal") {
            console.log('conversao de euro para real')
        }
        else if (selectConvertFrom.value === "fromEuro" && selectConvertTo.value === "toDolar") {
            console.log('conversao de euro para dolar')
        }
        else if (selectConvertFrom.value === "fromEuro" && selectConvertTo.value === "toBitcoin") {
            console.log('conversao de euro para bitcoin')
        }
    }
    catch (err) {
        alert(err)
    }
}

document.querySelector('#btnConvert').addEventListener('click', convertCurrency)