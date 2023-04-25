const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');

searchInput.addEventListener('input', () => {
  console.log(searchInput.value);
});

searchInput.addEventListener('input', function() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length > 2) {
    resultsList.innerHTML = '';
    return;
  }
  
  const apiUrl = `https://api.comparatrip.eu/cities/autocomplete/?q=${searchTerm}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(results => {
      resultsList.innerHTML = '';
      results.forEach(result => {
        const option = document.createElement('option');
        option.value = result.local_name;
        resultsList.appendChild(option);
        console.log(option.value);
      });
    })
    .catch(error => console.error(error));
});
