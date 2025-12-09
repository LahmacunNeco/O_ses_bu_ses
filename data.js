// --- 1. VERİ TABANI ---
const dublajVerileri = [
    // Lütfen buradaki afiş linklerinin çalıştığından emin olun.
    
    // Deadpool Serisi
    { film: "Deadpool", bolum: 1, karakter: "Wade Wilson (Deadpool)", sanatci: "Harun Can", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Deadpool", bolum: 1, karakter: "Weasel", sanatci: "Barış Özgenç", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Deadpool 2", bolum: 2, karakter: "Wade Wilson (Deadpool)", sanatci: "Harun Can", afis: "https://i.ibb.co/p3N4W4N/deadpool2-poster.jpg" },
    { film: "Deadpool 2", bolum: 2, karakter: "Cable", sanatci: "Rıza Karaağaç", afis: "https://i.ibb.co/p3N4W4N/deadpool2-poster.jpg" },
    
    // Shrek Serisi
    { film: "Shrek", bolum: 1, karakter: "Shrek", sanatci: "Okan Bayülgen", afis: "/images/Shrek.jpg" },
    { film: "Shrek", bolum: 1, karakter: "Eşek", sanatci: "Sezai Aydın", afis: "/images/Shrek.jpg" },
    { film: "Shrek 2", bolum: 2, karakter: "Shrek", sanatci: "Okan Bayülgen", afis: "https://i.ibb.co/L9H8bQc/shrek2-poster.jpg" },
    { film: "Shrek 2", bolum: 2, karakter: "Çizmeli Kedi", sanatci: "Engin Altan Düzyatan", afis: "https://i.ibb.co/L9H8bQc/shrek2-poster.jpg" },
    
    // Diğerleri
    { film: "Fight Club", bolum: 1, karakter: "Tyler Durden", sanatci: "Umut Tabak", afis: "https://i.ibb.co/y4p1R3y/fight-club-poster.jpg" },
    { film: "Buz Devri", bolum: 1, karakter: "Sid", sanatci: "Yekta Kopan", afis: "https://i.ibb.co/T1H89V4/ice-age-poster.jpg" },
];

// --- 2. JAVASCRIPT MANTIĞI ---

window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const sonucKutusu = document.getElementById('sonucAlani');
    const radioInputs = document.querySelectorAll('input[name="searchType"]');
    const backButtonContainer = document.getElementById('backButtonContainer');

    // Placeholder Güncelleme
    function updatePlaceholder() {
        const tip = document.querySelector('input[name="searchType"]:checked').value;
        if (tip === 'movie') {
            searchInput.placeholder = "Film/Seri adı girin (Örn: Shrek)...";
        } else {
            searchInput.placeholder = "Seslendirmen adı girin (Örn: Harun Can)...";
        }
        // Arama tipini değiştirince temizle
        sonucKutusu.innerHTML = '';
        backButtonContainer.innerHTML = '';
        // Arama yap (input boşsa bir şey göstermez)
        aramaYap(); 
    }

    // Arama Fonksiyonu (Ana Giriş Noktası)
    window.aramaYap = function() {
        const arananKelime = searchInput.value.trim().toLocaleLowerCase('tr');
        const aramaTipi = document.querySelector('input[name="searchType"]:checked').value;
        
        sonucKutusu.innerHTML = ""; // Temizlik
        backButtonContainer.innerHTML = ''; // Geri butonu temizliği

        if (arananKelime.length === 0) return;

        if (arananKelime.length < 2) {
            sonucKutusu.innerHTML = `<div class="error-msg">Aramak için en az 2 karakter girin.</div>`;
            return;
        }

        const aramaAlani = aramaTipi === 'movie' ? 'film' : 'sanatci';
        
        const bulunanlar = dublajVerileri.filter(kayit => 
            kayit[aramaAlani].toLocaleLowerCase('tr').includes(arananKelime)
        );

        if (bulunanlar.length === 0) {
            sonucKutusu.innerHTML = `<div class="error-msg">Aradığınız kriterlere uygun kayıt bulunamadı.</div>`;
            return;
        }

        if (aramaTipi === 'movie') {
            // FİLM ARAMA: Filmleri Grupla ve Seçim Listesini Göster
            gosterFilmSecimListesi(bulunanlar);
        } else {
            // SANATÇI ARAMA: Direkt Detayları Göster
            gosterSanatciSonuclari(bulunanlar);
        }
    }
    
    // Film Seçim Listesini Gösterir
    function gosterFilmSecimListesi(bulunanlar) {
        // Filmleri sadece tekil isim ve afişe göre grupla (Aynı filmin farklı bölümlerini listeler)
        const tekilFilmler = {};
        bulunanlar.forEach(kayit => {
            if (!tekilFilmler[kayit.film]) {
                tekilFilmler[kayit.film] = {
                    afis: kayit.afis,
                    filmAdi: kayit.film
                };
            }
        });

        let listeHTML = Object.keys(tekilFilmler).map(filmAdi => {
            const film = tekilFilmler[filmAdi];
            // Filmin adına tıklandığında detay gösterme fonksiyonunu çağır
            return `
                <div class="film-secim-karti" onclick="gosterFilmDetaylari('${filmAdi.replace(/'/g, "\\'")}')">
                    <img src="${film.afis}" alt="${filmAdi} Afişi">
                    <h4>${filmAdi}</h4>
                </div>
            `;
        }).join('');

        sonucKutusu.innerHTML = `
            <h2><i class="fas fa-search"></i> ${searchInput.value} Serisi Sonuçları</h2>
            <div id="filmSecimListesi">${listeHTML}</div>
        `;
    }

    // Tıklanan Filmin Tam Kadrosunu Gösterir
    window.gosterFilmDetaylari = function(filmAdi) {
        const detaylar = dublajVerileri.filter(kayit => kayit.film === filmAdi);
        
        let kadroHTML = detaylar.map(kisi => `
            <div class="cast-row">
                <span class="role-name">${kisi.karakter}</span>
                <span class="artist-name"><i class="fas fa-microphone"></i> ${kisi.sanatci}</span>
            </div>
        `).join('');

        const afisUrl = detaylar[0].afis || 'placeholder.jpg';
        
        // Geri Dön butonu ekle
        backButtonContainer.innerHTML = `
            <button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Arama Sonuçlarına Geri Dön</button>
        `;
        
        sonucKutusu.innerHTML = `
            <div class="movie-result-card">
                <div class="movie-header"><i class="fas fa-video"></i> ${filmAdi} (Tam Kadro)</div>
                <div class="cast-container">
                    <div class="movie-poster-area">
                        <img src="${afisUrl}" alt="${filmAdi} Afişi">
                    </div>
                    <div class="cast-list-area">
                        ${kadroHTML}
                    </div>
                </div>
            </div>
        `;
    }

    // Sanatçı Arama Sonuçlarını Gösterme Fonksiyonu
    function gosterSanatciSonuclari(bulunanlar) {
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

    // Olay Dinleyicileri (Event Listeners)
    updatePlaceholder(); 
    radioInputs.forEach(radio => {
        radio.addEventListener('change', updatePlaceholder);
    });
    // Buton ve Enter tuşu için olay dinleyicisi artık HTML içindeki 'oninput' ve 'onclick' ile yönetiliyor.
};
