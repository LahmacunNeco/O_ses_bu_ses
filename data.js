// --- 1. VERİ TABANI ---
const dublajVerileri = [
    { film: "Deadpool", karakter: "Wade Wilson (Deadpool)", sanatci: "Harun Can" },
    { film: "Deadpool", karakter: "Weasel", sanatci: "Barış Özgenç" },
    { film: "Deadpool", karakter: "Vanessa", sanatci: "Burcu Güneştutar" },
    { film: "Örümcek Adam", karakter: "Peter Parker", sanatci: "Harun Can" },
    { film: "Buz Devri", karakter: "Sid", sanatci: "Yekta Kopan" },
    { film: "Shrek", karakter: "Eşek", sanatci: "Sezai Aydın" },
    { film: "Fight Club", karakter: "Tyler Durden", sanatci: "Umut Tabak" }
];

// --- 2. FONKSİYONLAR VE MANTIK ---

// Tüm kodların sayfa yüklendikten sonra çalışmasını garanti eden yapı
window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const sonucKutusu = document.getElementById('sonucAlani');
    const radioInputs = document.querySelectorAll('input[name="searchType"]');

    // Placeholder Güncelleme
    function updatePlaceholder() {
        const tip = document.querySelector('input[name="searchType"]:checked').value;
        if (tip === 'movie') {
            searchInput.placeholder = "Film adı girin (Örn: Deadpool)...";
        } else {
            searchInput.placeholder = "Seslendirmen adı girin (Örn: Harun Can)...";
        }
        sonucKutusu.innerHTML = ''; // Mod değişince temizle
    }

    // Arama Fonksiyonu
    function aramaYap() {
        const arananKelime = searchInput.value.trim().toLocaleLowerCase('tr');
        const aramaTipi = document.querySelector('input[name="searchType"]:checked').value;
        
        sonucKutusu.innerHTML = ""; // Temizlik

        if (arananKelime.length < 2) {
            sonucKutusu.innerHTML = `<div class="error-msg">Lütfen en az 2 karakter girin.</div>`;
            return;
        }

        const aramaAlani = aramaTipi === 'movie' ? 'film' : 'sanatci';

        // Filtreleme
        const bulunanlar = dublajVerileri.filter(kayit => 
            kayit[aramaAlani].toLocaleLowerCase('tr').includes(arananKelime)
        );

        if (bulunanlar.length === 0) {
            sonucKutusu.innerHTML = `<div class="error-msg">Aradığınız kriterlere uygun kayıt bulunamadı.</div>`;
            return;
        }
        
        // Sonuçları Gösterme
        if (aramaTipi === 'movie') {
            // FİLM ARAMA: Gruplama ve Kadro Gösterimi
            const filmGruplari = {};
            bulunanlar.forEach(kayit => {
                if (!filmGruplari[kayit.film]) {
                    filmGruplari[kayit.film] = [];
                }
                filmGruplari[kayit.film].push(kayit);
            });

            Object.keys(filmGruplari).forEach(filmAdi => {
                const kadro = filmGruplari[filmAdi];
                let kadroHTML = kadro.map(kisi => `
                    <div class="cast-row">
                        <span class="role-name">${kisi.karakter}</span>
                        <span class="artist-name"><i class="fas fa-microphone"></i> ${kisi.sanatci}</span>
                    </div>
                `).join('');

                const kart = document.createElement('div');
                kart.className = 'movie-result-card';
                kart.innerHTML = `
                    <div class="movie-header"><i class="fas fa-video"></i> ${filmAdi}</div>
                    <div>${kadroHTML}</div>
                `;
                sonucKutusu.appendChild(kart);
            });

        } else {
            // SANATÇI ARAMA: Filmografi (Rol Listesi) Gösterimi
            bulunanlar.forEach(kayit => {
                const kart = document.createElement('div');
                kart.className = 'artist-result-card';
                kart.innerHTML = `
                    <div class="artist-info">
                        <h3>${kayit.sanatci}</h3>
                        <p>Film: <strong>${kayit.film}</strong></p>
                    </div>
                    <div class="character-tag">
                        ${kayit.karakter}
                    </div>
                `;
                sonucKutusu.appendChild(kart);
            });
        }
    }
    
    // Olay Dinleyicileri (Event Listeners)
    updatePlaceholder(); 
    radioInputs.forEach(radio => {
        radio.addEventListener('change', updatePlaceholder);
    });
    searchButton.addEventListener('click', aramaYap);
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            aramaYap();
        }
    });
};
