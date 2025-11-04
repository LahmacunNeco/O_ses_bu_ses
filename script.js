async function loadData() {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}

async function searchArtist() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const data = await loadData();
  const filtered = data.filter(item => item.isim.toLowerCase().includes(query));

  if (filtered.length === 0) {
    resultsDiv.innerHTML = '<p>Sonuç bulunamadı.</p>';
    return;
  }

  filtered.forEach(artist => {
    const card = document.createElement('div');
    card.classList.add('artist-card');

    card.innerHTML = `
      <img src="${artist.gorsel}" alt="${artist.isim}">
      <h2>${artist.isim}</h2>
      <p>${artist.biyografi}</p>
      <h3>Projeler:</h3>
      <ul class="projects">
        ${artist.projeler.map(p => `<li>${p}</li>`).join('')}
      </ul>
    `;
    resultsDiv.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', searchArtist);
