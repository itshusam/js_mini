document.getElementById('searchButton').addEventListener('click', async () => {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const resultContainer = document.getElementById('pokemonResult');
    resultContainer.innerHTML = '';

    if (!pokemonName) {
        resultContainer.innerHTML = '<p>Please enter a Pokémon name or ID.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            resultContainer.innerHTML = '<p>Pokémon not found. Please try again.</p>';
            return;
        }

        const pokemonData = await response.json();
        resultContainer.innerHTML = `
            <h3>${pokemonData.name.toUpperCase()}</h3>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <p><strong>Height:</strong> ${pokemonData.height}</p>
            <p><strong>Weight:</strong> ${pokemonData.weight}</p>
            <p><strong>Abilities:</strong> ${pokemonData.abilities.map(a => a.ability.name).join(', ')}</p>
        `;
    } catch (error) {
        resultContainer.innerHTML = '<p>Error fetching Pokémon data. Please try again later.</p>';
    }
});
