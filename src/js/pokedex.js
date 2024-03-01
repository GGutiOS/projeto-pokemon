// Função para pesquisar e exibir um Pokémon específico
async function searchPokemon() {
    const pokemonNumber = document.getElementById('pokemonNumber').value;
    const pokemonDetails = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
    
    // Exibir o contêiner dos detalhes do Pokémon pesquisado
    const detalhesPokemon = document.getElementById('detalhesPokemon');
    detalhesPokemon.style.display = 'block';
    
    // Limpar o contêiner dos detalhes do Pokémon pesquisado
    detalhesPokemon.innerHTML = '';

    // Exibir detalhes do Pokémon pesquisado
    const types = pokemonDetails.types.map(type => type.type.name).join(', ');
    const weight = `Peso: ${pokemonDetails.weight / 10} kg`;
    const height = `Altura: ${pokemonDetails.height / 10} m`;
    const stats = pokemonDetails.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');

    const div = document.createElement('div');
    div.className = 'detalhes-pokemon';

    // Adiciona botão para alternar entre imagens normal e Shiny
    const btnShiny = document.createElement('button');
    btnShiny.textContent = 'Alternar Shiny';
    btnShiny.addEventListener('click', async () => {
        if (pokemonDetails.sprites.front_shiny) {
            img.src = pokemonDetails.sprites.front_shiny;
        } else {
            alert('Não há versão Shiny deste Pokémon.');
        }
    });

    // Cria e configura a imagem do Pokémon
    const img = document.createElement('img');
    img.src = pokemonDetails.sprites.front_default;
    img.alt = pokemonDetails.name;
    img.classList.add('pokemon-image');

    // Cria e configura os detalhes do Pokémon
    const nomePokemon = document.createElement('p');
    nomePokemon.textContent = pokemonDetails.name;
    nomePokemon.classList.add('pokemon-name');

    const tiposPokemon = document.createElement('p');
    tiposPokemon.textContent = `Tipos: ${types}`;
    tiposPokemon.classList.add('pokemon-types');

    const pesoPokemon = document.createElement('p');
    pesoPokemon.textContent = weight;
    pesoPokemon.classList.add('pokemon-weight');

    const alturaPokemon = document.createElement('p');
    alturaPokemon.textContent = height;
    alturaPokemon.classList.add('pokemon-height');

    const estatisticasPokemon = document.createElement('p');
    estatisticasPokemon.innerHTML = stats;
    estatisticasPokemon.classList.add('pokemon-stats');

    // Adiciona os elementos ao contêiner de detalhes do Pokémon
    div.appendChild(btnShiny);
    div.appendChild(img);
    div.appendChild(nomePokemon);
    div.appendChild(tiposPokemon);
    div.appendChild(pesoPokemon);
    div.appendChild(alturaPokemon);
    div.appendChild(estatisticasPokemon);

    detalhesPokemon.appendChild(div);
}


// Event listener para o formulário de pesquisa
const pokemonSearchForm = document.getElementById('pokemonSearchForm');
pokemonSearchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    searchPokemon();
});
