//Function to handle showing/hiding specific name input fields
function toggleSpecificInputFields(elementID, displayStyle) {
    const inputField = document.getElementById(elementID);
    if (inputField) {
        inputField.style.display = displayStyle;
    
     } else {
      console.error(`Element with ID '${elementID}' not fouund.`);
  }

}

//-----------------event listener for fetch dropdown menus

  //event listeners for character dropdown menus
  document.getElementById("characterRequestType").addEventListener("change", function () {
      const characterValue = this.value;
      toggleSpecificInputFields(
        "specificCharacterName",
        characterValue === "specific" ? "inline-block" : "none"
      );
    });
  
    //event listenener for starship dopdown menu
  document.getElementById("starshipRequestType").addEventListener("change", function () {
    const starshipValue = this.value;
    toggleSpecificInputFields(
      "specificStarshipName",
      starshipValue === "specific" ? "inline-block" : "none"
    );
  });


  //-------------------------------------------event listener for fetching data 


  //event listener for fetching character data
  document.getElementById("characterRequestType").addEventListener("click", () => {
    const characterList = document.getElementById("characterRequestType");
    const characterValue = characterList.value;
  
    if (characterValue === "random") {
      fetchRandomCharacter();

    }else if (characterValue === "all") {
      fetchAllCharacters();

    } else if (characterValue === "specific") {
      const characterName = document.getElementById("specificCharacterName").value;
      fetchSpecificCharacter(characterName);
    
    } else {
      // fetch character by id 3 dots 
      fetchCharacter(characterValue);// 06/10 changed from fetchCharacter 
    }
  });
  
  //--------------------------------------------------------------------------------------------

  //event listener for fetching starship data

  document.getElementById("starshipRequestType").addEventListener("click", () => {
    const starshipList = document.getElementById("starshipRequestType");
    const starshipValue = starshipList.value;
  
    if (starshipValue === "random") {
        fetchRandomStarship();

    } else if(starshipValue === "all") {
        fetchAllStarships();

    } else if (starshipValue === "specific") {
      
      const starshipName = document.getElementById("specificStarshipName").value;//fetch  specific starship 3 dots 
      fetchStarship(starshipName);
  
  
   }else{
      // fetch starship by id
      fetchStarship(starshipValue);//06/01 changed from fetchStarship
    }
  });

  
  // ------------------Reset button event listener

document.getElementById("reset").addEventListener("click", function() {
  console.log("Reset button clicked");
  resetContent(); // Reset the content
  unlockInputField(); // Unlock the input fields
});

//-----------------------------------------------------------Reset 
// Reset content function
function resetContent() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
}
  //-----------------------------------------fetch Character data 

  function fetchRandomCharacter() {
    const randomId = Math.floor(Math.random() * 83) + 1; // Generate a random number between 1 and 83 (number of characters)
    const url = `https://www.swapi.tech/api/people/${randomId}`; // Construct the URL with the random ID
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
  
  
  //function to fetch all characters
  function fetchAllCharacters() {
    fetch("https://www.swapi.tech/api/people")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
          }
          return response.json();
        })
        .then((data) => displayAllStarships(data.results))
        .catch((error) => handleError(error));
    }

  //function to fetch specific character by name
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
    // Function to fetch character by ID - ADDED FUNCTION
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

//-------------------------------fetch starthip data 

function fetchRandomStarship() {
  const randomId = Math.floor(Math.random() * 83) + 1; // Generate a random number between 1 and 83 (number of characters)
  const url = `https://www.swapi.tech/api/starship/${randomId}`; // Construct the URL with the random ID
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
  //function to fetch all starships
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
  // function to get specific starship
  function fetchSpecificStarhip(starshipName) {
    fetch(`https://www.swapi.tech/api/starships/?name=${starshipName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          displayStarship(data.results[0].properties);
        } else {
          throw new Error("starship not found");
        }
      })
      .catch((error) => handleError(error));
  }
  // Function to fetch starship by ID - ADDED FUNCTION
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


  //--------------------------------------------function to display characters

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
    contentDiv.innerHTML = "<h2> All Charcters</h2>";
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
          <p><strong>Model:</strong>${starship.model}</p>
          <p><strong>Crew:</strong>${starship.crew}</p> `;
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

// Reset content function
function resetContent() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  
  }

// Unlock input field function
function unlockInputField() {
  document.getElementById("specificCharacterName").value = "";
  document.getElementById("specificCharacterName").disabled = false;
  document.getElementById("specificStarshipName").value = "";
  document.getElementById("specificStarshipName").disabled = false;
}

  // Function to fetch a character's starships
  function fetchCharacterStarships(characterID) {
    // Implement fetching starships for a character
  }
  
  // Function to fetch starship's weapons
  function fetchStarshipWeapons(starshipID) {
    // Implement fetching weapons for a starship
  }
  // Example fetch to verify functionality:
  fetch("https://www.swapi.tech/api/people/1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching data:", error));
    console.log(document.getElementById("characterRequestType"));
