// --- VERİTABANI ---
// Tüm veriyi buraya ekliyoruz. İlişkiyi kod kuracak.
const database = [
    { film: "Deadpool", karakter: "Wade Wilson", sanatci: "Harun Can" },
    { film: "Deadpool", karakter: "Weasel", sanatci: "Barış Özgenç" },
    { film: "Deadpool", karakter: "Vanessa", sanatci: "Burcu Güneştutar" },
    
    { film: "Buz Devri", karakter: "Sid", sanatci: "Yekta Kopan" },
    { film: "Buz Devri", karakter: "Manny", sanatci: "Ali Poyrazoğlu" },
    { film: "Buz Devri", karakter: "Diego", sanatci: "Haluk Bilginer" },
    
    { film: "Örümcek Adam", karakter: "Peter Parker", sanatci: "Harun Can" },
    { film: "Örümcek Adam", karakter: "May Hala", sanatci: "Gülen Karaman" },
    
    { film: "Shrek", karakter: "Eşek", sanatci: "Sezai Aydın" },
    { film: "Shrek", karakter: "Shrek", sanatci: "Okan Bayülgen" },
    
    { film: "Yüzüklerin Efendisi", karakter: "Gandalf", sanatci: "İstemi Betil" },
    { film: "Yüzüklerin Efendisi", karakter: "Aragorn", sanatci: "Boğaçhan Sözmen" }
];

// Arama türünü değiştirdiğimizde placeholder yazısını güncelle
const radioButtons = document.querySelectorAll('input[name="searchType"]');
const searchInput = document.getElementById('searchInput');

radioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if(e.target.value === 'movie') {
            searchInput.placeholder = "Film adı girin (Örn: Deadpool)...";
        } else {
            searchInput.placeholder = "Sanatçı adı girin (Örn: Harun Can)...";
        }
        // Mod değişince eski sonuçları temizle
        document.getElementById('results').innerHTML = '';
        document.getElementById('no-result').classList.add('hidden');
    });
});

function searchDatabase() {
    const searchTerm = searchInput.value.toLocaleLowerCase('tr').trim();
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    const resultsArea = document.getElementById('results');
    const noResultMsg = document.getElementById('no-result');

    // Temizlik
    resultsArea.innerHTML = '';
    noResultMsg.classList.add('hidden');

    if (searchTerm === "") {
        alert("Lütfen bir şey yazın.");
        return;
    }

    if (searchType === 'movie') {
        // --- FILM ARAMA MODU ---
        
        // 1. Önce film adına göre eşleşen tüm kayıtları bul
        const matches = database.filter(item => 
            item.film.toLocaleLowerCase('tr').includes(searchTerm)
        );

        if (matches.length === 0) {
            noResultMsg.classList.remove('hidden');
            return;
        }

        // 2. Bulunan kayıtları Film Adına göre grupla (Örn: Deadpool kayıtlarını birleştir)
        // Bu işlem "Deadpool 1" ve "Deadpool 2" gibi benzer isimler çıkarsa diye gerekli.
        const moviesMap = {};
        
        matches.forEach(item => {
            if (!moviesMap[item.film]) {
                moviesMap[item.film] = [];
            }
            moviesMap[item.film].push(item);
        });

        // 3. Ekrana Bas (Film Kartı ve İçindeki Kadro)
        Object.keys(moviesMap).forEach(movieName => {
            const cast = moviesMap[movieName]; // O filmin kadrosu listesi
            
            let castHtml = '';
            cast.forEach(role => {
                castHtml += `
                    <li class="cast-item">
                        <span class="character-name">${role.karakter}</span>
                        <span class="artist-name">${role.sanatci}</span>
                    </li>
                `;
            });

            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <div class="movie-title">${movieName}</div>
                <ul class="cast-list">
                    ${castHtml}
                </ul>
            `;
            resultsArea.appendChild(movieCard);
        });

    } else {
        // --- SANATÇI ARAMA MODU ---
        
        const matches = database.filter(item => 
            item.sanatci.toLocaleLowerCase('tr').includes(searchTerm)
        );

        if (matches.length === 0) {
            noResultMsg.classList.remove('hidden');
            return;
        }

        // Sanatçı için basit kartlar
        matches.forEach(item => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist-card');
            artistCard.innerHTML = `
                <div>
                    <strong>${item.sanatci}</strong><br>
                    <small style="color:#aaa">Film: ${item.film}</small>
                </div>
                <div style="color:var(--primary)">
                    ${item.karakter}
                </div>
            `;
            resultsArea.appendChild(artistCard);
        });
    }
}

// Enter tuşu desteği
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') searchDatabase();
});
