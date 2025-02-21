let dolar = 5.7277;

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");


usdInput.addEventListener("keyup", () => {
    usdInput.value = formatCurrency(usdInput.value)
} );

brlInput.addEventListener("keyup", () => {
    brlInput.value = formatCurrency(brlInput.value)
} );

usdInput.value = "1000,00";
conversao("usd-to-brl");


// Funções
function formatCurrency(value) {
    // Ajuste de valor...
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractuinDigits: 2
    }

    // Formatação;
    let formatter = new Intl.NumberFormat("pr-BR", options)

    // Return;
    return formatter.format(fixedValue);

}

function fixValue (value) {
    let fixedValue = value.replace(",", "."); // Ajuste de valor ("," = "." USD);
    let floatValue = parseFloat(fixedValue);

    if (floatValue == NaN) {
        floatValue = 0
    }
    return floatValue
}

function convert(type) {
    if (type == "usd-to-brl") {
        // Converção; 
        // Add valor de R$ Input;



    }

    if (type == "brl-to-usd") {
        // Ajuste de valor ("," = "." USD);
        // Converção; 
        // Add valor de US$ Input;

    }

}
