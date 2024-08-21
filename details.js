let currentPokemonId = 1; 

async function fetchPokemonDetails(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found.');
        }
        const pokemonData = await response.json();

        const pokemonDetails = document.getElementById('pokemon-details');
        pokemonDetails.innerHTML = `
            <h3>${pokemonData.name.toUpperCase()}</h3>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <p><strong>Height:</strong> ${pokemonData.height}</p>
            <p><strong>Weight:</strong> ${pokemonData.weight}</p>
            <p><strong>Abilities:</strong> ${pokemonData.abilities.map(a => a.ability.name).join(', ')}</p>
            <p><strong>Types:</strong> ${pokemonData.types.map(t => t.type.name).join(', ')}</p>
        `;
    } catch (error) {
        const pokemonDetails = document.getElementById('pokemon-details');
        pokemonDetails.innerHTML = `<p>Error fetching Pokémon data: ${error.message}</p>`;
    }
}


fetchPokemonDetails(currentPokemonId);


document.getElementById('prevPokemon').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemonDetails(currentPokemonId);
    }
});

document.getElementById('nextPokemon').addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemonDetails(currentPokemonId);
});
