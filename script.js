async function loadData() {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}

async function search() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const data = await loadData();
  const { seslendirmeler, filmler } = data;

  // --- Seslendirme sanatçısı araması ---
  const sanatciSonuclar = seslendirmeler.filter(s =>
    s.isim.toLowerCase().includes(query)
  );

  // --- Film araması ---
  const filmSonuclar = filmler.filter(f =>
    f.isim.toLowerCase().includes(query)
  );

  if (sanatciSonuclar.length === 0 && filmSonuclar.length === 0) {
    resultsDiv.innerHTML = '<p>Sonuç bulunamadı.</p>';
    return;
  }

  // --- Sanatçı sonuçlarını göster ---
  sanatciSonuclar.forEach(s => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${s.gorsel}" alt="${s.isim}">
      <h2>${s.isim}</h2>
      <p>${s.biyografi}</p>
      <h3>Projeleri:</h3>
      <ul class="character">
        ${s.projeler
          .map(
            p =>
              `<li><strong>${p.film}</strong> — ${p.karakter} (Orijinal ses: ${p.orijinalSes})</li>`
          )
          .join('')}
      </ul>
    `;
    resultsDiv.appendChild(card);
  });

  // --- Film sonuçlarını göster ---
  filmSonuclar.forEach(f => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${f.afis}" alt="${f.isim}">
      <h2>${f.isim}</h2>
      <h3>Karakterler:</h3>
      <ul class="character">
        ${f.karakterler
          .map(
            k =>
              `<li><strong>${k.ad}</strong> — Orijinal: ${k.orijinalSes}, Türkçe: ${k.turkceSes}</li>`
          )
          .join('')}
      </ul>
    `;
    resultsDiv.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', search);
