'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn-country');
  const countriesContainer = document.querySelector('.countries');

  const renderCountry = (data, className = '') => {
    const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
          <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
        </div>
      </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  };

  const renderError = (msg) => {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
  };

  const getJSON = (url, errorMsg = 'Something went wrong') => {
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();
      });
  };

  const fetchCountryData = (country) => {
    getJSON(`https://restcountries.com/v3.1/name/${country}`)
      .then(data => renderCountry(data[0]))
      .catch(err => renderError(`Something went wrong: ${err.message}`));
  };

  // Example: Fetch data for a specific country when the page loads
  fetchCountryData('India');

  // Event listener for button click to fetch country data
  btn.addEventListener('click', () => {
    const countryInput = prompt("Enter the country name:");
    if (countryInput) {
      fetchCountryData(countryInput);
    }
  });
});
