// --- 1. SANATÇI DETAYLI BİLGİLERİ (ANSİKLOPEDİ) ---
const sanatciBilgileri = {
    "Harun Can": {
        resim: "https://r.resimlink.com/LIn8M2mK.jpg", // Örnek resim linki
        dogumTarihi: "1980-03-27",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        ebeveynler: "Bilgi Yok",
        cocuklar: "Bilgi Yok",
        biyografi: "Harun Can, Türk seslendirme sanatçısı, müzisyen ve oyuncudur. Özellikle Deadpool, Örümcek Adam ve Adventure Time'daki Finn karakteriyle tanınır. Ankara Üniversitesi Dil ve Tarih-Coğrafya Fakültesi mezunudur."
    },
    "Yekta Kopan": {
        resim: "https://r.resimlink.com/vH1N_7.jpg",
        dogumTarihi: "1968-03-28",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        ebeveynler: "Lütfü Kopan (Babası)",
        cocuklar: "Duru Kopan",
        biyografi: "Yekta Kopan, yazar, seslendirme sanatçısı ve sunucudur. Buz Devri serisindeki 'Sid' karakteriyle efsaneleşmiştir. Aynı zamanda birçok kitabın yazarı ve önemli kültür-sanat programlarının sunucusudur."
    }
    // Buraya yeni sanatçılar ekleyebilirsiniz...
};

// --- 2. FİLM VE KADRO VERİLERİ ---
const dublajVerileri = [
    { film: "Deadpool", karakter: "Wade Wilson", sanatci: "Harun Can", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Buz Devri", karakter: "Sid", sanatci: "Yekta Kopan", afis: "https://i.ibb.co/T1H89V4/ice-age-poster.jpg" },
    { film: "Shrek", karakter: "Eşek", sanatci: "Sezai Aydın", afis: "https://i.ibb.co/C0f9y8q/shrek-poster.jpg" }
];

// --- 3. MANTIK VE FONKSİYONLAR ---

window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const sonucKutusu = document.getElementById('sonucAlani');
    const backButtonContainer = document.getElementById('backButtonContainer');

    // Yaş Hesaplama Fonksiyonu
    function yasHesapla(dogumTarihi, olumTarihi = null) {
        const dogum = new Date(dogumTarihi);
        const sonTarih = olumTarihi ? new Date(olumTarihi) : new Date();
        let yas = sonTarih.getFullYear() - dogum.getFullYear();
        const ay = sonTarih.getMonth() - dogum.getMonth();
        if (ay < 0 || (ay === 0 && sonTarih.getDate() < dogum.getDate())) yas--;
        return yas;
    }

    // ANA ARAMA FONKSİYONU
    window.aramaYap = function() {
        const aranan = searchInput.value.trim().toLocaleLowerCase('tr');
        const tip = document.querySelector('input[name="searchType"]:checked').value;
        sonucKutusu.innerHTML = ""; 
        backButtonContainer.innerHTML = '';

        if (aranan.length < 2) return;

        if (tip === 'movie') {
            const bulunanlar = dublajVerileri.filter(f => f.film.toLocaleLowerCase('tr').includes(aranan));
            gosterFilmListesi(bulunanlar);
        } else {
            // Sanatçı araması hem ana veriden hem de profil verisinden yapılabilir
            const sanatciIsimleri = Object.keys(sanatciBilgileri).filter(s => s.toLocaleLowerCase('tr').includes(aranan));
            gosterSanatciListesi(sanatciIsimleri);
        }
    };

    function gosterFilmListesi(liste) {
        const tekil = [...new Set(liste.map(item => item.film))];
        if (tekil.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Film bulunamadı.</p>"; return; }
        
        let html = `<div id="filmSecimListesi">`;
        tekil.forEach(fName => {
            const film = liste.find(l => l.film === fName);
            html += `<div class="film-secim-karti" onclick="gosterFilmDetay('${fName.replace(/'/g, "\\'")}')">
                <img src="${film.afis}"><h4>${fName}</h4></div>`;
        });
        html += `</div>`;
        sonucKutusu.innerHTML = html;
    }

    window.gosterFilmDetay = function(fName) {
        const kadro = dublajVerileri.filter(d => d.film === fName);
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()">← Geri Dön</button>`;
        
        let kadroHtml = kadro.map(k => `
            <div class="cast-row">
                <span>${k.karakter}</span>
                <span class="artist-link" onclick="gosterSanatciProfil('${k.sanatci}')">${k.sanatci}</span>
            </div>
        `).join('');

        sonucKutusu.innerHTML = `
            <div class="movie-result-card">
                <div class="movie-header">${fName}</div>
                <div class="cast-container">
                    <div class="movie-poster-area"><img src="${kadro[0].afis}"></div>
                    <div class="cast-list-area">${kadroHtml}</div>
                </div>
            </div>`;
    };

    function gosterSanatciListesi(liste) {
        if (liste.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Sanatçı bulunamadı.</p>"; return; }
        sonucKutusu.innerHTML = liste.map(s => `
            <div class="artist-result-card" style="cursor:pointer; background:white; padding:15px; margin-bottom:10px; border-radius:10px;" onclick="gosterSanatciProfil('${s}')">
                <strong style="color:var(--primary)">${s}</strong> (Profili Gör)
            </div>
        `).join('');
    }

    window.gosterSanatciProfil = function(isim) {
        const s = sanatciBilgileri[isim];
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()">← Geri Dön</button>`;
        
        if (!s) {
            sonucKutusu.innerHTML = `<p class="error-msg">${isim} hakkında henüz detaylı biyografi eklenmemiş.</p>`;
            return;
        }

        const yas = yasHesapla(s.dogumTarihi);

        sonucKutusu.innerHTML = `
            <div class="artist-profile-card">
                <div class="profile-header">
                    <img src="${s.resim}" class="profile-img">
                    <div class="profile-main-info">
                        <h2>${isim}</h2>
                        <p><i class="fas fa-map-marker-alt"></i> ${s.dogumYeri}</p>
                    </div>
                </div>
                <div class="profile-body">
                    <div class="info-group">
                        <div class="info-label">Doğum Tarihi / Yaş</div>
                        <div class="info-value">${s.dogumTarihi} (${yas} Yaşında)</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Durum</div>
                        <div class="info-value">${s.durum}</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Ebeveynler</div>
                        <div class="info-value">${s.ebeveynler}</div>
                    </div>
                    <div class="info-group">
                        <div class="info-label">Çocuklar</div>
                        <div class="info-value">${s.cocuklar}</div>
                    </div>
                    <div class="bio-section">
                        <div class="info-label">Biyografi</div>
                        <p class="bio-text">${s.biyografi}</p>
                    </div>
                </div>
            </div>
        `;
    };
};
