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
    const { name, id, types, weight, height, stats, sprites } = pokemonDetails;

    // Nome do Pokémon com a primeira letra maiúscula
    const nomeCapitalizado = name.charAt(0).toUpperCase() + name.slice(1);

    // ID e nome do Pokémon com a primeira letra maiúscula
    const idNomePokemon = `#${id} - ${nomeCapitalizado}`;

    // Mapeia os tipos de Pokémon para elementos <span> com as classes correspondentes
    const tiposPokemon = types.map(type => `<span class="pokemon-type tipo-${type.type.name}">${type.type.name}</span>`).join('');

    detalhesPokemon.innerHTML = `
        <div class="detalhes-pokemon ${document.body.classList.contains('modo-escuro') ? 'modo-escuro-border' : ''}">
            <p class="pokemon-name">${idNomePokemon}</p>
            <img src="${sprites.front_default}" alt="${name}" class="pokemon-image">
            <button class="btn-shiny">Alternar Shiny</button>
            <p class="pokemon-types">Tipos: ${tiposPokemon}</p>
            <p class="pokemon-weight">Peso: ${weight / 10} kg</p>
            <p class="pokemon-height">Altura: ${height / 10} m</p>
            <p class="pokemon-stats">${stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>')}</p>
        </div>
    `;

    // Adicionar evento ao botão Shiny
    const btnShiny = detalhesPokemon.querySelector('.btn-shiny');
    btnShiny.addEventListener('click', () => {
        const imgPokemon = detalhesPokemon.querySelector('.pokemon-image');
        if (imgPokemon.src === sprites.front_default) {
            imgPokemon.src = sprites.front_shiny || sprites.front_default;
        } else {
            imgPokemon.src = sprites.front_default;
        }
    });
}

// Event listener para o formulário de pesquisa
const pokemonSearchForm = document.getElementById('pokemonSearchForm');
pokemonSearchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    searchPokemon();
});
