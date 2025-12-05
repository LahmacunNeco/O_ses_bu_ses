// --- 1. VERİ TABANI (Afişler için yer tutucu eklendi) ---
const dublajVerileri = [
    { film: "Deadpool", karakter: "Wade Wilson (Deadpool)", sanatci: "Harun Can", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Deadpool", karakter: "Weasel", sanatci: "Barış Özgenç", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Deadpool", karakter: "Vanessa", sanatci: "Burcu Güneştutar", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    
    { film: "Örümcek Adam", karakter: "Peter Parker", sanatci: "Harun Can", afis: "https://i.ibb.co/Bnr5c1J/spiderman-poster.jpg" },
    { film: "Örümcek Adam", karakter: "May Hala", sanatci: "Gülen Karaman", afis: "https://i.ibb.co/Bnr5c1J/spiderman-poster.jpg" },
    
    { film: "Buz Devri", karakter: "Sid", sanatci: "Yekta Kopan", afis: "https://i.ibb.co/T1H89V4/ice-age-poster.jpg" },
    
    { film: "Shrek", karakter: "Eşek", sanatci: "Sezai Aydın", afis: "https://i.ibb.co/C0f9y8q/shrek-poster.jpg" },
    { film: "Shrek", karakter: "Shrek", sanatci: "Okan Bayülgen", afis: "https://i.ibb.co/C0f9y8q/shrek-poster.jpg" },
    
    { film: "Fight Club", karakter: "Tyler Durden", sanatci: "Umut Tabak", afis: "https://i.ibb.co/y4p1R3y/fight-club-poster.jpg" },
    { film: "Fight Club", karakter: "Anlatıcı", sanatci: "Murat Şen", afis: "https://i.ibb.co/y4p1R3y/fight-club-poster.jpg" }
];
// NOT: Yukarıdaki afiş linkleri örnek resimler için "image hosting" servislerine yüklenmiştir. Gerçek projede kendi linklerinizi kullanabilirsiniz.

// --- 2. FONKSİYONLAR VE MANTIK ---
window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const sonucKutusu = document.getElementById('sonucAlani');
    const radioInputs = document.querySelectorAll('input[name="searchType"]');

    // Placeholder Güncelleme (Gereklilik)
    function updatePlaceholder() {
        const tip = document.querySelector('input[name="searchType"]:checked').value;
        if (tip === 'movie') {
            searchInput.placeholder = "Film adı girin (Örn: Deadpool)...";
        } else {
            searchInput.placeholder = "Seslendirmen adı girin (Örn: Harun Can)...";
        }
        // Mod değişince hemen arama yap (Ekstra Kullanım Kolaylığı)
        aramaYap(); 
    }

    // Arama Fonksiyonu (Hem buton hem de oninput ile çağrılır)
    window.aramaYap = function() {
        const arananKelime = searchInput.value.trim().toLocaleLowerCase('tr');
        const aramaTipi = document.querySelector('input[name="searchType"]:checked').value;
        
        sonucKutusu.innerHTML = ""; // Temizlik

        // Anlık aramada kısa kelimeleri filtrele (performans için)
        if (arananKelime.length < 2 && arananKelime.length > 0) {
            sonucKutusu.innerHTML = `<div class="error-msg">Aramak için en az 2 karakter girin.</div>`;
            return;
        }
        
        // Eğer arama kutusu boşsa, sonuç gösterme
        if (arananKelime.length === 0) return;

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
            // FİLM ARAMA: Gruplama ve Kadro Gösterimi (AFİŞ EKLENDİ)
            const filmGruplari = {};
            bulunanlar.forEach(kayit => {
                if (!filmGruplari[kayit.film]) {
                    filmGruplari[kayit.film] = [];
                }
                filmGruplari[kayit.film].push(kayit);
            });

            Object.keys(filmGruplari).forEach(filmAdi => {
                const kadro = filmGruplari[filmAdi];
                const afisUrl = kadro[0].afis || 'placeholder.jpg'; // İlk kayıttan afişi al

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
                    <div class="cast-container">
                        <div class="movie-poster-area">
                            <img src="${afisUrl}" alt="${filmAdi} Afişi">
                        </div>
                        <div class="cast-list-area">
                            ${kadroHTML}
                        </div>
                    </div>
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
    // Anlık arama (oninput) HTML'de tanımlı
};
