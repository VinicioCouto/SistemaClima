var mainindex = document.getElementById('main')

// Chave da API e URL base
const apiKey = "8a60b2de14f7a17C7a11706b2cfcd87c";
const urlBase = "https://api.openweathermap.org/data/2.5/weather";

// Função para buscar dados do clima
function buscarClima(cidade) {
    const url = `${urlBase}?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada");
            }
            return response.json();
        })
        .then(data => exibirClima(data))
        .catch(error => {
            alert(error.message);
        });
}

// Função para exibir dados do clima na página
function exibirClima(data) {
    // Seleciona os elementos HTML
    const estadoAtual = document.getElementById("estadoatual");
    const temperatura = document.getElementById("temperatura");
    const imgClimaCentral = document.getElementById("imgclimacentral");

    // Define os dados do clima
    estadoAtual.textContent = data.weather[0].description;
    temperatura.textContent = `${Math.round(data.main.temp)} ºC`;

    // Define o ícone do clima de acordo com o clima atual
    const icon = data.weather[0].icon;
    imgClimaCentral.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    mainindex.style.display = 'block'
}

// Adiciona o evento de clique ao botão "Pesquisar"
document.getElementById("bottoncidade").addEventListener("click", () => {
    var div = document.getElementById('inptdiv')
    var titulo = document.getElementById('nometitulo')
    
    const cidade = document.getElementById("nomedacidade").value;
    if (cidade) {
        buscarClima(cidade);
        div.style.display = 'none'
        titulo.innerHTML = cidade
    } else {
        alert("Por favor, insira o nome de uma cidade");
    }
});
