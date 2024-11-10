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

// Função para exibir dados do clima na página
function exibirClima(data) {
    // Seleciona os elementos HTML existentes
    const estadoAtual = document.getElementById("estadoatual");
    const temperatura = document.getElementById("temperatura");
    const imgClimaCentral = document.getElementById("imgclimacentral");

    // Atualiza os dados do clima principal
    estadoAtual.textContent = data.weather[0].description;
    temperatura.textContent = `${Math.round(data.main.temp)} ºC`;
    
    // Define o ícone do clima de acordo com o clima atual
    const icon = data.weather[0].icon;
    imgClimaCentral.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Exibe o elemento principal
    mainindex.style.display = 'block';

    // Adiciona os dados de umidade, temperatura mínima e máxima, e velocidade do vento
    document.getElementById("dianome").textContent = "Umidade";
    document.getElementById("temperaturadia").textContent = `${data.main.humidity}%`;
    
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);
    const windSpeed = Math.round(data.wind.speed);

    var climasDias = document.getElementById('climasdias')

    // Atualiza os elementos HTML com os valores
    document.getElementById("temperaturaminima").textContent = `${tempMin} ºC`;
    document.getElementById("temperaturamaxima").textContent = `${tempMax} ºC`;
    document.getElementById("ventovelocidade").textContent = `${windSpeed} km/h`;
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
