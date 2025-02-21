let dolar = 5.7277; // Valor inicial enquanto a API não responde.

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

// Buscar a cotação do dólar assim que a página carregar
document.addEventListener("DOMContentLoaded", () => {
    fetchExchangeRate();
});

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl");
});

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd");
});

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput);
});

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput);
});

usdInput.value = "1000,00";
convert("usd-to-brl");

// Funções
function formatCurrency(value) {
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    };
    let formatter = new Intl.NumberFormat("pt-BR", options);
    return formatter.format(fixedValue);
}

function fixValue(value) {
    let fixedValue = value.replace(",", "."); // Ajuste de valor ("," = "." USD);
    let floatValue = parseFloat(fixedValue);

    if (isNaN(floatValue)) {
        floatValue = 0;
    }
    return floatValue;
}

function convert(type) {
    if (type == "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value);

        let result = fixedValue * dolar;
        result = result.toFixed(2);

        brlInput.value = formatCurrency(result);
    }

    if (type == "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);

        let result = fixedValue / dolar;
        result = result.toFixed(2);

        usdInput.value = formatCurrency(result);
    }
}

// Função para buscar a cotação do dólar
function fetchExchangeRate() {
    const apiUrl = "https://api.exchangerate.host/latest?base=USD&symbols=BRL";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar a cotação");
            }
            return response.json();
        })
        .then(data => {
            dolar = data.rates.BRL; // Atualiza a variável global com o valor da API
            console.log(`Cotação atual do dólar: ${dolar}`);
            convert("usd-to-brl"); // Recalcula com a nova cotação
        })
        .catch(error => {
            console.error("Erro ao buscar a cotação do dólar:", error);
        });
}
