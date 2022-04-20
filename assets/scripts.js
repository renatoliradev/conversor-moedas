
//#region VALIDATE SELECTION OF 'Converter de'
let selectConvertFrom = document.querySelector('#selectConvertFrom');
let selectConvertTo = document.querySelector('#selectConvertTo');

const validateSelectionConvertFrom = () => {
    while (selectConvertTo.length > 0) selectConvertTo.remove(0)

    if (selectConvertFrom.value === "fromReal") {
        selectConvertTo.options[0] = new Option('$ Dólar Americano', 'toDolar');
        selectConvertTo.options[1] = new Option('€ Euro', 'toEuro');
        selectConvertTo.options[2] = new Option('BTC Bitcoin', 'toBitcoin');
    }
    else if (selectConvertFrom.value === "fromDolar") {
        selectConvertTo.options[0] = new Option('R$ Real Brasileiro', 'toReal');
        selectConvertTo.options[1] = new Option('€ Euro', 'toEuro');
        selectConvertTo.options[2] = new Option('BTC Bitcoin', 'toBitcoin');
    }
    else if (selectConvertFrom.value === "fromEuro") {
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

selectConvertFrom.addEventListener('change', validateSelectionConvertFrom)
//#endregion

async function getCurrency() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,BRL-USD,EUR-USD,BTC-USD,BRL-EUR,USD-EUR,BTC-EUR');
        const data = await response.json();

        let realToDolar = data.USDBRL.ask
        let realtoEuro = data.EURBRL.ask
        let realtoBitcoin = data.BTCBRL.ask

        let dolarToReal = data.BRLUSD.ask
        let dolarToEuro = data.EURUSD.ask
        let dolarToBitcoin = data.BTCUSD.ask

        let euroToReal = data.BRLEUR.ask
        let euroToDolar = data.USDEUR.ask
        let euroToBitcoin = data.BTCEUR.ask

        console.log('real para dolar: ' + realToDolar)
        console.log('real para euro: ' + realtoEuro)
        console.log('real para bitcoin: ' + realtoBitcoin)
        console.log('')
        console.log('dolar para real: ' + dolarToReal)
        console.log('dolar para euro: ' + dolarToEuro)
        console.log('dolar para bitcoin: ' + dolarToBitcoin)
        console.log('')
        console.log('euro para real: ' + euroToReal)
        console.log('euro para dolar: ' + euroToDolar)
        console.log('euro para bitcoin: ' + euroToBitcoin)
    }
    catch (err) {
        alert(err + ' \nErro na requisição dos valores para conversão.')
    }
}

const convertCurrency = () => {
    try {
        if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toDolar") {
            console.log('conversao de real para dolar')
        }
        else if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toEuro") {
            console.log('conversao de real para euro')
        }
        else if (selectConvertFrom.value === "fromReal" && selectConvertTo.value === "toBitcoin") {
            console.log('conversao de real para bitcoin')
        }
        else if (selectConvertFrom.value === "fromDolar" && selectConvertTo.value === "toReal") {
            console.log('conversao de dolar para real')
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
        alert(err + '\n\nErro na conversão. Tente novamente!')
    }
}

 getCurrency();

document.querySelector('#btnConvert').addEventListener('click', convertCurrency)