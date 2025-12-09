// --- 1. VERİ TABANI ---

// A) Dublaj Kayıtları (Kim kimi seslendirdi?)
const dublajVerileri = [
    // Deadpool Serisi
    { film: "Deadpool", bolum: 1, karakter: "Wade Wilson (Deadpool)", sanatci: "Harun Can", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Deadpool", bolum: 1, karakter: "Weasel", sanatci: "Barış Özgenç", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Deadpool 2", bolum: 2, karakter: "Wade Wilson (Deadpool)", sanatci: "Harun Can", afis: "https://i.ibb.co/p3N4W4N/deadpool2-poster.jpg" },
    
    // Shrek Serisi
    { film: "Shrek", bolum: 1, karakter: "Shrek", sanatci: "Okan Bayülgen", afis: "https://i.ibb.co/C0f9y8q/shrek-poster.jpg" },
    { film: "Shrek", bolum: 1, karakter: "Eşek", sanatci: "Sezai Aydın", afis: "https://i.ibb.co/C0f9y8q/shrek-poster.jpg" },
    { film: "Shrek 2", bolum: 2, karakter: "Shrek", sanatci: "Okan Bayülgen", afis: "https://i.ibb.co/L9H8bQc/shrek2-poster.jpg" },
    { film: "Shrek 2", bolum: 2, karakter: "Çizmeli Kedi", sanatci: "Engin Altan Düzyatan", afis: "https://i.ibb.co/L9H8bQc/shrek2-poster.jpg" },
    
    // Diğerleri
    { film: "Fight Club", bolum: 1, karakter: "Tyler Durden", sanatci: "Umut Tabak", afis: "https://i.ibb.co/y4p1R3y/fight-club-poster.jpg" },
    { film: "Buz Devri", bolum: 1, karakter: "Sid", sanatci: "Yekta Kopan", afis: "https://i.ibb.co/T1H89V4/ice-age-poster.jpg" },
];

// B) Sanatçı Biyografileri (Yeni Yapı)
const artistVerileri = [
    { 
        ad: "Harun Can",
        dogumTarihi: "25 Ağustos 1982",
        dogumYeri: "İstanbul, Türkiye",
        yasi: "43", 
        olumTarihi: null, // Hayatta ise null
        olumYeri: null,
        cocuklar: "Yok",
        resim: "https://i.ibb.co/gSTwY7X/haruncan-profile.jpg",
        biyografi: "Türk seslendirme sanatçısı, yazar ve eğitmen. Ryan Reynolds ve Leonardo DiCaprio'nun değişmez sesi olarak bilinir. Birçok popüler film ve dizinin ana karakterini seslendirmiştir. Aynı zamanda dublaj atölyeleri düzenleyerek yeni nesil sanatçıların yetişmesine katkıda bulunmaktadır.",
    },
    { 
        ad: "Okan Bayülgen",
        dogumTarihi: "23 Mart 1964",
        dogumYeri: "İstanbul, Türkiye",
        yasi: "61", 
        olumTarihi: null,
        olumYeri: null,
        cocuklar: "Şirin",
        resim: "https://i.ibb.co/2cKx70d/okan-profile.jpg",
        biyografi: "Oyuncu, yönetmen, yapımcı, komedyen, seslendirme sanatçısı ve talk show sunucusu. Türk medyasının önemli figürlerindendir. Özellikle animasyon filmlerdeki Shrek karakterine sesiyle hayat vermesiyle tanınmıştır.",
    },
    { 
        ad: "Sezai Aydın",
        dogumTarihi: "12 Aralık 1952",
        dogumYeri: "Ankara, Türkiye",
        yasi: "Vefat etti", 
        olumTarihi: "17 Mayıs 2021",
        olumYeri: "İstanbul, Türkiye",
        cocuklar: "Kaan, Ece",
        resim: "https://i.ibb.co/3sXz6rV/sezai-profile.jpg",
        biyografi: "Usta tiyatro, sinema ve seslendirme sanatçısıdır. Sylvester Stallone ve Al Pacino gibi dünya yıldızlarını yıllarca seslendirmiştir. Shrek serisinde Eşek karakterine yaptığı dublaj, Türk dublaj tarihinin kült işlerindendir. Türk tiyatrosuna ve dublajına büyük katkıları olmuştur.",
    },
    { 
        ad: "Yekta Kopan",
        dogumTarihi: "28 Mart 1968",
        dogumYeri: "Ankara, Türkiye",
        yasi: "57", 
        olumTarihi: null, 
        olumYeri: null,
        cocuklar: "Ege",
        resim: "https://i.ibb.co/yQjK7s1/yekta-profile.jpg",
        biyografi: "Yazar, seslendirme sanatçısı, sunucu. Yazdığı kitaplarla ödüller kazanmış, aynı zamanda Ice Age serisinde Sid karakterine sesiyle hayat vermiştir. Türk edebiyat ve sanat camiasının çok yönlü isimlerindendir.",
    },
    // Diğer sanatçılar için de buraya bilgi ekleyebilirsiniz (Barış Özgenç, Umut Tabak, Rıza Karaağaç vb.)
];

// --- 2. JAVASCRIPT MANTIĞI ---

window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const sonucKutusu = document.getElementById('sonucAlani');
    const radioInputs = document.querySelectorAll('input[name="searchType"]');
    const backButtonContainer = document.getElementById('backButtonContainer');

    // Helper: Tarih nesnesinden yaş hesaplama
    function calculateAge(birthDateString, deathDateString) {
        if (!birthDateString) return 'Bilinmiyor';

        const parseDate = (dateStr) => {
            const parts = dateStr.split(' ');
            const monthNames = { "Ocak": 0, "Şubat": 1, "Mart": 2, "Nisan": 3, "Mayıs": 4, "Haziran": 5, "Temmuz": 6, "Ağustos": 7, "Eylül": 8, "Ekim": 9, "Kasım": 10, "Aralık": 11 };
            const day = parseInt(parts[0]);
            const month = monthNames[parts[1]];
            const year = parseInt(parts[2]);
            return new Date(year, month, day);
        };
        
        const birthDate = parseDate(birthDateString);
        let referenceDate = deathDateString ? parseDate(deathDateString) : new Date();

        let age = referenceDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = referenceDate.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    // Placeholder Güncelleme
    function updatePlaceholder() {
        const tip = document.querySelector('input[name="searchType"]:checked').value;
        if (tip === 'movie') {
            searchInput.placeholder = "Film/Seri adı girin (Örn: Shrek)...";
        } else {
            searchInput.placeholder = "Sanatçı adı girin (Örn: Harun Can)...";
        }
        // Arama tipini değiştirince temizle
        sonucKutusu.innerHTML = '';
        backButtonContainer.innerHTML = '';
        aramaYap(); 
    }

    // Arama Fonksiyonu (Ana Giriş Noktası)
    window.aramaYap = function() {
        const arananKelime = searchInput.value.trim().toLocaleLowerCase('tr');
        const aramaTipi = document.querySelector('input[name="searchType"]:checked').value;
        
        sonucKutusu.innerHTML = ""; 
        backButtonContainer.innerHTML = ''; 

        if (arananKelime.length === 0) return;

        if (arananKelime.length < 2) {
            sonucKutusu.innerHTML = `<div class="error-msg">Aramak için en az 2 karakter girin.</div>`;
            return;
        }

        const aramaAlani = aramaTipi === 'movie' ? 'film' : 'ad';
        
        const aramaKaynagi = aramaTipi === 'movie' ? dublajVerileri : artistVerileri;

        const bulunanlar = aramaKaynagi.filter(kayit => 
            kayit[aramaAlani].toLocaleLowerCase('tr').includes(arananKelime)
        );

        if (bulunanlar.length === 0) {
            sonucKutusu.innerHTML = `<div class="error-msg">Aradığınız kritere uygun kayıt/sanatçı bulunamadı.</div>`;
            return;
        }

        if (aramaTipi === 'movie') {
            gosterFilmSecimListesi(bulunanlar);
        } else {
            gosterSanatciSonuclari(bulunanlar);
        }
    }
    
    // FİLM: Seçim Listesini Gösterir
    function gosterFilmSecimListesi(bulunanlar) {
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

    // FİLM: Tıklanan Filmin Tam Kadrosunu Gösterir
    window.gosterFilmDetaylari = function(filmAdi) {
        const detaylar = dublajVerileri.filter(kayit => kayit.film === filmAdi);
        
        let kadroHTML = detaylar.map(kisi => {
            const artist = artistVerileri.find(a => a.ad === kisi.sanatci);
            // Sanatçı adına tıklandığında detay sayfasına yönlendirme eklendi
            return `
                <div class="cast-row">
                    <span class="role-name">${kisi.karakter}</span>
                    <span class="artist-name" onclick="gosterSanatciDetay('${kisi.sanatci.replace(/'/g, "\\'")}')" style="cursor: pointer; color: var(--primary); font-style: normal; font-weight: 500;">
                        <i class="fas fa-microphone"></i> ${kisi.sanatci}
                    </span>
                </div>
            `;
        }).join('');

        const afisUrl = detaylar[0].afis || 'placeholder.jpg';
        
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

    // SANATÇI: Arama Sonuçlarını Gösterme (Detay sayfasına yönlendirmeli)
    function gosterSanatciSonuclari(bulunanlar) {
        // Sanatçı listesini sadece tekil isimlere göre filtrele
        const tekilSanatcilar = Array.from(new Set(bulunanlar.map(a => a.ad)))
                                       .map(ad => artistVerileri.find(a => a.ad === ad));
        
        tekilSanatcilar.forEach(sanatci => {
            const kart = document.createElement('div');
            // Tıklayınca detay fonksiyonunu çağırır
            kart.className = 'artist-result-card';
            kart.setAttribute('onclick', `gosterSanatciDetay('${sanatci.ad.replace(/'/g, "\\'")}')`);

            kart.innerHTML = `
                <div class="artist-info">
                    <h3>${sanatci.ad}</h3>
                    <p>Doğum: <strong>${sanatci.dogumTarihi}</strong></p>
                </div>
                <div class="character-tag">
                    Detay Gör <i class="fas fa-arrow-right"></i>
                </div>
            `;
            sonucKutusu.appendChild(kart);
        });
    }


    // YENİ FONKSİYON: Sanatçı Biyografi Detayını Gösterir
    window.gosterSanatciDetay = function(artistAdi) {
        const sanatci = artistVerileri.find(a => a.ad === artistAdi);

        if (!sanatci) {
            sonucKutusu.innerHTML = `<div class="error-msg">${artistAdi} adlı sanatçının biyografik bilgileri bulunamadı.</div>`;
            return;
        }

        // Yaş ve ölüm durumunu hesapla
        let yasBilgisi = '';
        if (sanatci.olumTarihi) {
            const olumYasi = calculateAge(sanatci.dogumTarihi, sanatci.olumTarihi);
            yasBilgisi = `Ölüm: ${sanatci.olumTarihi} (${sanum.olumYeri ? sanatci.olumYeri : 'Bilinmiyor'}) - **${olumYasi} yaşında**`;
        } else {
            const mevcutYas = calculateAge(sanatci.dogumTarihi, null);
            yasBilgisi = `Yaş: **${mevcutYas}**`;
        }
        
        // Geri Dön butonu ekle (bir önceki arama sonucuna dönmek için)
        backButtonContainer.innerHTML = `
            <button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Arama Sonuçlarına Geri Dön</button>
        `;

        // Sanatçının rol aldığı filmleri bul
        const filmleri = dublajVerileri.filter(d => d.sanatci === artistAdi);
        let filmografiHTML = filmleri.map(d => 
            `<div class="cast-row">
                <span class="role-name">${d.film}</span>
                <span class="artist-name">${d.karakter}</span>
            </div>`).join('');
        if (filmleri.length === 0) filmografiHTML = `<p>Dublaj verisi bulunamadı.</p>`;


        sonucKutusu.innerHTML = `
            <div class="artist-detail-card">
                <div class="artist-header">
                    <div class="artist-img-container">
                        <img src="${sanatci.resim}" alt="${sanatci.ad} resmi">
                    </div>
                    <div class="artist-summary">
                        <h2>${sanatci.ad}</h2>
                        <p><i class="fas fa-birthday-cake"></i> Doğum: **${sanatci.dogumTarihi}** (${sanatci.dogumYeri})</p>
                        <p><i class="fas fa-clock"></i> ${yasBilgisi}</p>
                        ${sanatci.cocuklar ? `<p><i class="fas fa-child"></i> Çocuk(lar): ${sanatci.cocuklar}</p>` : ''}
                    </div>
                </div>

                <div class="artist-bio">
                    <h3>Biyografi</h3>
                    <p class="artist-bio-text">${sanatci.biyografi}</p>
                </div>
                
                <div class="artist-bio">
                    <h3>Dublaj Filmografisi</h3>
                    ${filmografiHTML}
                </div>
            </div>
        `;
    }

    // Olay Dinleyicileri (Event Listeners)
    updatePlaceholder(); 
    radioInputs.forEach(radio => {
        radio.addEventListener('change', updatePlaceholder);
    });
};
