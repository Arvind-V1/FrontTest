const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');
const resultsFrom = document.getElementById('results-from');

searchInput.addEventListener('input', () => {
  console.log(searchInput.value);
});

function popularCity()
{
  const apiUrl = `https://api.comparatrip.eu/cities/popular/5`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(results => {
        resultsList.innerHTML = '<p class="Dest">Destination populaire</p>';
        results.forEach(result => {
          const option = document.createElement('option');
          option.value = result.local_name;
          option.text  = result.local_name;
          option.link  = result.local_name;
          resultsList.appendChild(option);
        });
      })
      .catch(error => console.error(error));
}

searchInput.addEventListener('input', function() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length < 1) 
  {
    popularCity();
  }  
  const apiUrl = `https://api.comparatrip.eu/cities/autocomplete/?q=${searchTerm}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(results => {
      resultsList.innerHTML = '';
      results.forEach(result => {
        const option = document.createElement('option');
        option.value = result.local_name;
        option.text  = result.local_name;
        resultsList.appendChild(option);
      });
    })
    .catch(error => console.error(error));

    const apiUrl2 = `https://api.comparatrip.eu/cities/popular/from/${searchTerm}/5`;
  
  fetch(apiUrl2)
    .then(response => response.json())
    .then(results => {
      if (results.length > 1) {
        resultsFrom.innerHTML = '<p class="Dest">Destination populaire en partance de ' + searchTerm + '</p>';
      }
      results.forEach(result => {
        const option = document.createElement('option');
        option.value = result.local_name;
        option.text  = result.local_name;
        resultsFrom.appendChild(option);
      });
    })
    .catch(error => console.error(error));
});
searchInput.onclick  = popularCity();
