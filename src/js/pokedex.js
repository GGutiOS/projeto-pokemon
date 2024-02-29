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

    div.innerHTML = `
        <div class="informacoes">
            <span>${pokemonDetails.name}</span>
            <span>#${pokemonDetails.id}</span>
        </div>

        <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}" class="gif">

        <ul class="tipos">
            ${types.split(', ').map(type => `<li class="tipo-${type.toLowerCase()}">${type}</li>`).join('')}
        </ul>

        <p class="peso">${weight}</p>
        <p class="altura">${height}</p>
        <p class="estatisticas">${stats}</p>
    `;

    detalhesPokemon.appendChild(div);
}

// Event listener para o formulário de pesquisa
const pokemonSearchForm = document.getElementById('pokemonSearchForm');
pokemonSearchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    searchPokemon();
});
