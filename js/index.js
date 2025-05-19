document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("reset").addEventListener("click", function () {
    console.log("Reset button clicked");
    resetContent();
    unlockInputField();
  });

  // Function to handle showing/hiding specific name input fields
  function toggleSpecificInputFields(elementID, displayStyle) {
    const inputField = document.getElementById(elementID);
    if (inputField) {
      inputField.style.display = displayStyle;
    } else {
      console.error(`Element with ID '${elementID}' not found.`);
    }
  }

  // Combined character dropdown logic
  document.getElementById("characterRequestType").addEventListener("change", function () {
    const characterValue = this.value;

    toggleSpecificInputFields(
      "specificCharacterName",
      characterValue === "specific" ? "inline-block" : "none"
    );

    if (characterValue === "random") {
      fetchRandomCharacter();
    } else if (characterValue === "all") {
      fetchAllCharacters();
    } else if (characterValue === "specific") {
      const name = document.getElementById("specificCharacterName").value;
      fetchSpecificCharacter(name);
    } else {
      fetchCharacter(characterValue);
    }
  });

  // Combined starship dropdown logic
  document.getElementById("starshipRequestType").addEventListener("change", function () {
    const starshipValue = this.value;

    toggleSpecificInputFields(
      "specificStarshipName",
      starshipValue === "specific" ? "inline-block" : "none"
    );

    if (starshipValue === "random") {
      fetchRandomStarship();
    } else if (starshipValue === "all") {
      fetchAllStarships();
    } else if (starshipValue === "specific") {
      const name = document.getElementById("specificStarshipName").value;
      fetchSpecificStarship(name);
    } else {
      fetchStarship(starshipValue);
    }
    console.log("Starship value selected:", starshipValue);
  });

  // Reset content function
  function resetContent() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";
  }

  // Unlock input fields
  function unlockInputField() {
    document.getElementById("specificCharacterName").value = "";
    document.getElementById("specificCharacterName").disabled = false;
    document.getElementById("specificStarshipName").value = "";
    document.getElementById("specificStarshipName").disabled = false;
  }

  // Character fetch functions
  function fetchRandomCharacter() {
    const randomId = Math.floor(Math.random() * 83) + 1;
    const url = `https://www.swapi.tech/api/people/${randomId}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          const randomCharacter = data.result.properties;
          console.log('Random character selected:', randomCharacter);
          displayCharacter(randomCharacter, data.result.uid);
        } else {
          throw new Error("Character not found");
        }
      })
      .catch((error) => {
        console.error('Error fetching random character:', error);
        handleError(error);
      });
  }

  function fetchAllCharacters() {
    fetch("https://www.swapi.tech/api/people")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => displayAllCharacters(data.results))
      .catch((error) => handleError(error));
  }

  function fetchSpecificCharacter(characterName) {
    fetch(`https://www.swapi.tech/api/people/?name=${characterName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          displayCharacter(data.results[0].properties, data.results[0].uid);
        } else {
          throw new Error("Character not found");
        }
      })
      .catch((error) => handleError(error));
  }

  function fetchCharacter(characterId) {
    fetch(`https://www.swapi.tech/api/characters/${characterId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          displayCharacter(data.result.properties, data.result.uid);
        } else {
          throw new Error("Character not found");
        }
      })
      .catch((error) => handleError(error));
  }

  // Starship fetch functions
  function fetchRandomStarship() {
    const randomId = Math.floor(Math.random() * 83) + 1;
    const url = `https://www.swapi.tech/api/starships/${randomId}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          const randomStarship = data.result.properties;
          console.log('Random starship selected:', randomStarship);
          displayStarship(randomStarship);
        } else {
          throw new Error("Starship not found");
        }
      })
      .catch((error) => {
        console.error('Error fetching random starship:', error);
        handleError(error);
      });
  }

  function fetchAllStarships() {
    fetch("https://www.swapi.tech/api/starships")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => displayAllStarships(data.results))
      .catch((error) => handleError(error));
  }

  function fetchSpecificStarship(starshipName) {
    fetch(`https://www.swapi.tech/api/starships/?name=${starshipName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          displayStarship(data.results[0].properties);
        } else {
          throw new Error("Starship not found");
        }
      })
      .catch((error) => handleError(error));
  }

  function fetchStarship(starshipId) {
    fetch(`https://www.swapi.tech/api/starships/${starshipId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          displayStarship(data.result.properties);
        } else {
          throw new Error("Starship not found");
        }
      })
      .catch((error) => handleError(error));
  }

  // Display functions
  function displayCharacter(character, uid) {
    if (!character) {
      handleError(new Error('Character data is undefined'));
      return;
    }
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `
      <h2>${character.name}</h2>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <button onclick="fetchCharacterStarships('${uid}')">View Starships</button>`;
  }

  function displayAllCharacters(characters) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "<h2> All Characters</h2>";
    characters.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.innerHTML = `
        <h3>${character.name}</h3>
        <button onclick="fetchCharacter(${character.uid})">View Details</button>`;
      contentDiv.appendChild(characterDiv);
    });
  }

  function displayStarship(starship) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `
      <h2>${starship.name}</h2>
      <p><strong>Model:</strong> ${starship.model}</p>
      <p><strong>Crew:</strong> ${starship.crew}</p>`;
  }

  function displayAllStarships(starships) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "<h2> All Starships</h2>";
    starships.forEach((starship) => {
      const starshipDiv = document.createElement("div");
      starshipDiv.innerHTML = `
        <h3>${starship.name}</h3>
        <button onclick="fetchStarship(${starship.uid})">View Details</button>`;
      contentDiv.appendChild(starshipDiv);
    });
  }

  function handleError(error) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    console.error("Error fetching data:", error);
  }

  // Placeholder stubs
  function fetchCharacterStarships(characterID) {
    console.log("Fetching starships for character:", characterID);
  }

  function fetchStarshipWeapons(starshipID) {
    console.log("Fetching weapons for starship:", starshipID);
  }

  // Test fetch
  fetch("https://www.swapi.tech/api/people/1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching data:", error));

  console.log(document.getElementById("characterRequestType"));
});
