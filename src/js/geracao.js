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
        const tiposPokemon = pokemon.types.map(type => `<span class="pokemon-type tipo-${type.type.name}">${type.type.name}</span>`).join('');
        listaPokemonGeracao.innerHTML += `
            <li class="pokemon-card">
                <p class="pokemon-name-id">${pokemon.name} - #${pokemon.id}</p>
                <div class="pokemon-image-container">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
                </div>
                <div class="pokemon-types">${tiposPokemon}</div>
            </li>
        `;
    }
}




// Função para buscar detalhes de um Pokémon específico
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
