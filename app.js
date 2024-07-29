/*
http://api.nbp.pl/api/exchangerates/rates/{table}/{code}/

*/

const request = require('request')
const fs = require('fs');

const validCodes = ['usd', 'eur', 'gbp', 'chf'];

const code = process.argv[2];

const isValid = validCodes.find( currency => currency === code) ? true : false;

// if (!isValid) process.exit();

const url = `https://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`

request(url, { json:true }, (err, res, body) => {
    if (err) {
        return console.log("Wystąpił błąd:", err);
    }
    if (res.statusCode !== 200) {
        return console.log("Wystąpił błąd. Sprawdź URL.");
    };

    const message = `Średni cena ${body.currency} w dniu ${body.rates[0].effectiveDate} wynosi ${body.rates[0].mid} złotych.`;
    
    fs.appendFile('currencies.txt', message +'\n', (err) => {
        console.log('Dane dodane do pliku')
    })
    
    console.log(message);
})