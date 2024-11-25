const searchInput = document.getElementById('search');
const countriesContainer = document.getElementById('countries-container');

async function searchCountries() {
  const query = searchInput.value.toLowerCase();
  
  if (query === '') {
    countriesContainer.style.display = 'none'; 
    return;
  }

  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    
    // Filter countries based on search query
    const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(query)
    );

    if (filteredCountries.length > 0) {
      countriesContainer.style.display = 'flex'; 
      displayCountries(filteredCountries);
    } else {
      countriesContainer.style.display = 'none'; 
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

function displayCountries(countries) {
  countriesContainer.innerHTML = ''; 

  countries.forEach(country => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('col-md-4', 'country-card', 'mb-4');

    countryCard.innerHTML = `
      <div class="card">
        <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common}">
        <div class="card-body">
          <h5 class="card-title">${country.name.common}</h5>
          <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
          <p class="card-text">Region: ${country.region}</p>
          <p class="card-text">Population: ${country.population.toLocaleString()}</p>
        </div>
      </div>
    `;

    countriesContainer.appendChild(countryCard);
  });
}
