document.addEventListener('DOMContentLoaded', () => {
    const typeContainer = document.getElementById('type-container');
    const types = ['grass', 'fire', 'water', 'electric', 'psychic', 'ice', 'dragon', 'fairy', 'bug', 'fighting', 'rock', 'ghost', 'dark', 'steel', 'poison', 'flying'];

    types.forEach(type => {
        const typeSection = document.createElement('div');
        typeSection.classList.add('col-md-4', 'mb-4');
        typeSection.innerHTML = `
            <h2 class="text-center">${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <div id="${type}-pokemon-list" class="pokemon-list">
                <!-- Pokémon of type ${type} will be dynamically added here -->
            </div>
        `;
        typeContainer.appendChild(typeSection);

        fetchPokemonsByType(type);
    });

    function fetchPokemonsByType(type) {
        fetch(`https://pokeapi.co/api/v2/type/${type}`)
            .then(response => response.json())
            .then(data => {
                const pokemonList = document.getElementById(`${type}-pokemon-list`);
                data.pokemon.forEach(pokemon => {
                    fetch(pokemon.pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            const pokemonItem = document.createElement('div');
                            pokemonItem.classList.add('pokemon-item');
                            pokemonItem.innerHTML = `
                                <h4>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h4>
                                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="img-fluid">
                            `;
                            pokemonList.appendChild(pokemonItem);
                        });
                });
            })
            .catch(error => console.error('Error fetching Pokémon:', error));
    }
});
