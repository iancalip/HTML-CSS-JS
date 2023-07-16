let result = document.getElementById('result');
let search = document.getElementById('searchButton');

search.addEventListener('click', async () => {
  let searchText = document.getElementById('search').value;
  let response = await fetch(`https://swapi.dev/api/planets/?search=${searchText}&format=json`);
  let data = await response.json();
  let info = document.createElement('div');
  if (data.results.length > 0) {
    let planet = data.results[0];
    let table = await getResidents(planet.residents);
    info.innerHTML = `
      <p class="title">${planet.name}</p>
      <p>Climate: ${planet.climate}</p>
      <p>Population: ${planet.population}</p>
      <p>Terrain: ${planet.terrain}</p>
      ${table}
    `;
  } else {
    info.innerHTML = `<p> No planet found </p>`;
  }
  document.body.appendChild(info)
});

async function getResidents(residents) {
  let table = '<table><th>Residents</th><th>Birth Date</th>';
  for (let url of residents) {
    let response = await fetch(url + '?format=json');
    let resident = await response.json();
    table += '<tr><td>' + resident.name + '</td><td>' + resident.birth_year + '</td></tr>'
  }
  table += '</table>';
  return table;
}

async function getPlanets() {
  let response = await fetch('https://swapi.dev/api/planets/?format=json');
  let {results} = await response.json();

  results.forEach(planet => {
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.textContent = planet.name;
    li.appendChild(button);
    button.addEventListener('click', async () => {
      let table = await getResidents(planet.residents);
      let info = document.createElement('div');
      info.innerHTML = `
        <p>Name: ${planet.name}</p>
        <p>Climate: ${planet.climate}</p>
        <p>Population: ${planet.population}</p>
        <p>Terrain: ${planet.terrain}</p>
        ${table}
      `;
      li.appendChild(info);
    });
    result.appendChild(li);
  });
}
