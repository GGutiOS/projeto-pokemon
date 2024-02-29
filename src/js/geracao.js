// Mapeamento dos números de Pokémon para suas respectivas gerações
const generacoes = {
    1: [1, 151], // 1ª Geração: de 1 a 151
    2: [152, 251], // 2ª Geração: de 152 a 251
    3: [252, 386], // 3ª Geração: de 252 a 386
    4: [387, 493], // 4ª Geração: de 387 a 493
    5: [494, 649], // 5ª Geração: de 494 a 649
    6: [650, 721], // 6ª Geração: de 650 a 721
    7: [722, 809], // 7ª Geração: de 722 a 809
    8: [810, 898], // 8ª Geração: de 810 a 898
};

// Adicione um evento de clique para cada botão de geração
document.addEventListener('DOMContentLoaded', () => {
    const botoesGeracao = document.querySelectorAll('.botao-geracao');
    botoesGeracao.forEach(botao => {
        botao.addEventListener('click', async () => {
            const geracao = botao.getAttribute('data-geracao');
            const numerosPokemon = generacoes[geracao];
            const pokemonDaGeracao = await fetchPokemonByGenerationNumbers(numerosPokemon);
            displayPokemonByGeneration(pokemonDaGeracao, geracao);

            // Oculta todas as listas de Pokémon, exceto a da geração clicada
            const todasAsListasPokemon = document.querySelectorAll('.lista-pokemon .geracao');
            todasAsListasPokemon.forEach(lista => {
                if (lista.id === `geracao${geracao}`) {
                    lista.style.display = 'flex';
                } else {
                    lista.style.display = 'none';
                }
            });
        });
    });
});

// Função para buscar os Pokémon de uma geração específica na API pelo número do Pokémon
async function fetchPokemonByGenerationNumbers(numbers) {
    const pokemonList = [];
    for (let i = numbers[0]; i <= numbers[1]; i++) {
        const pokemonDetails = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemonList.push(pokemonDetails);
    }
    return pokemonList;
}

// Função para exibir os Pokémon de uma geração específica
function displayPokemonByGeneration(pokemonList, geracao) {
    const listaPokemonGeracao = document.querySelector(`#geracao${geracao}`);
    listaPokemonGeracao.innerHTML = ''; // Limpa a lista de Pokémon da geração anterior, se houver

    for (const pokemon of pokemonList) {
        const li = document.createElement('li');
        li.classList.add('pokemon-card'); // Adiciona a classe 'pokemon-card' ao elemento <li>

        // Nome e ID do Pokémon
        const nomeIdPokemon = document.createElement('p');
        nomeIdPokemon.textContent = `${pokemon.name} - #${pokemon.id}`;
        nomeIdPokemon.classList.add('pokemon-name-id');
        li.appendChild(nomeIdPokemon);

        // Imagem do Pokémon
        const divImageContainer = document.createElement('div');
        divImageContainer.classList.add('pokemon-image-container');
        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name;
        img.classList.add('pokemon-image');
        divImageContainer.appendChild(img);
        li.appendChild(divImageContainer);

        // Tipos do Pokémon
        const tiposPokemon = document.createElement('div');
        tiposPokemon.classList.add('pokemon-types');
        pokemon.types.forEach(type => {
            const tipoPokemon = document.createElement('span');
            tipoPokemon.textContent = type.type.name;
            tipoPokemon.classList.add('pokemon-type', `tipo-${type.type.name}`);
            tiposPokemon.appendChild(tipoPokemon);
        });
        li.appendChild(tiposPokemon);
        
        listaPokemonGeracao.appendChild(li);
    }
}




// Função para buscar detalhes de um Pokémon específico
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}