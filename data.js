// --- 1. SANATÇI DETAYLI VERİTABANI ---
const sanatciProfilleri = {
    "Harun Can": {
        resim: "https://r.resimlink.com/LIn8M2mK.jpg",
        dogumTarihi: "1980-03-27",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        ebeveynler: "Bilgi Yok",
        cocuklar: "Bilgi Yok",
        biyografi: "Harun Can, Türk seslendirme sanatçısı ve müzisyendir. Özellikle Deadpool ve Örümcek Adam seslendirmeleriyle geniş kitlelerce tanınmıştır."
    },
    "Yekta Kopan": {
        resim: "https://r.resimlink.com/vH1N_7.jpg",
        dogumTarihi: "1968-03-28",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        ebeveynler: "Lütfü Kopan",
        cocuklar: "Duru Kopan",
        biyografi: "Yekta Kopan, yazar ve seslendirme sanatçısıdır. Buz Devri'ndeki Sid karakteriyle hafızalara kazınmıştır."
    }
};

// --- 2. FİLM VE SESLENDİRME VERİLERİ ---
const dublajVerileri = [
    { film: "Shrek", karakter: "Shrek", sanatci: "Okan Bayülgen", afis: "https://i.ibb.co/C0f9y8q/shrek-poster.jpg" },
    { film: "Shrek", karakter: "Eşek", sanatci: "Sezai Aydın", afis: "https://i.ibb.co/C0f9y8q/shrek-poster.jpg" },
    { film: "Shrek 2", karakter: "Shrek", sanatci: "Okan Bayülgen", afis: "https://i.ibb.co/L9H8bQc/shrek2-poster.jpg" },
    { film: "Shrek 2", karakter: "Çizmeli Kedi", sanatci: "Engin Altan Düzyatan", afis: "https://i.ibb.co/L9H8bQc/shrek2-poster.jpg" },
    { film: "Deadpool", karakter: "Deadpool", sanatci: "Harun Can", afis: "https://i.ibb.co/6y4gX0d/deadpool-poster.jpg" },
    { film: "Buz Devri", karakter: "Sid", sanatci: "Yekta Kopan", afis: "https://i.ibb.co/T1H89V4/ice-age-poster.jpg" },
    { film: "Angry Birds", karakter: "Red", sanatci: "Yekta Kopan", afis: "https://i.ibb.co/T1H89V4/ice-age-poster.jpg" }];

// --- 3. SİSTEM MANTIĞI ---

window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const sonucKutusu = document.getElementById('sonucAlani');
    const backButtonContainer = document.getElementById('backButtonContainer');

    function yasHesapla(dogumStr) {
        if(!dogumStr) return "Bilinmiyor";
        const dogum = new Date(dogumStr);
        const simdi = new Date();
        let yas = simdi.getFullYear() - dogum.getFullYear();
        if (simdi.getMonth() < dogum.getMonth() || (simdi.getMonth() === dogum.getMonth() && simdi.getDate() < dogum.getDate())) yas--;
        return yas;
    }

    window.aramaYap = function() {
        const aranan = searchInput.value.trim().toLocaleLowerCase('tr');
        const tip = document.querySelector('input[name="searchType"]:checked').value;
        sonucKutusu.innerHTML = ""; 
        backButtonContainer.innerHTML = '';

        if (aranan.length < 2) return;

        if (tip === 'movie') {
            // Film araması: Seri isimlerini bulur
            const bulunanlar = dublajVerileri.filter(d => d.film.toLocaleLowerCase('tr').includes(aranan));
            gosterFilmSecimListesi(bulunanlar);
        } else {
            // Sanatçı araması: Sanatçının adını arar
            const bulunanlar = dublajVerileri.filter(d => d.sanatci.toLocaleLowerCase('tr').includes(aranan));
            gosterSanatciSonuclari(bulunanlar, aranan);
        }
    };

    // FİLM ARAMA SONUCU: Afişli Liste
    function gosterFilmSecimListesi(liste) {
        if (liste.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Film bulunamadı.</p>"; return; }
        
        const tekilFilmler = {};
        liste.forEach(item => {
            if (!tekilFilmler[item.film]) tekilFilmler[item.film] = item.afis;
        });

        let html = `<div id="filmSecimListesi">`;
        Object.keys(tekilFilmler).forEach(fName => {
            html += `
                <div class="film-secim-karti" onclick="gosterFilmDetay('${fName.replace(/'/g, "\\ Baltimore")}')">
                    <img src="${tekilFilmler[fName]}" alt="${fName}">
                    <h4>${fName}</h4>
                </div>`;
        });
        html += `</div>`;
        sonucKutusu.innerHTML = html;
    }

    // FİLM DETAYI: Kadro
    window.gosterFilmDetay = function(fName) {
        const kadro = dublajVerileri.filter(d => d.film === fName);
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;
        
        let kadroHtml = kadro.map(k => `
            <div class="cast-row">
                <span><strong>${k.karakter}</strong></span>
                <span class="artist-link" onclick="gosterSanatciProfil('${k.sanatci}')">${k.sanatci}</span>
            </div>
        `).join('');

        sonucKutusu.innerHTML = `
            <div class="movie-result-card">
                <div class="movie-header">${fName} Seslendirme Kadrosu</div>
                <div class="cast-container">
                    <div class="movie-poster-area"><img src="${kadro[0].afis}"></div>
                    <div class="cast-list-area">${kadroHtml}</div>
                </div>
            </div>`;
    };

    // SANATÇI ARAMA SONUCU: Karakter Listesi
    function gosterSanatciSonuclari(liste, aranan) {
        if (liste.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Sanatçı bulunamadı.</p>"; return; }
        
        // Sanatçı isimlerini grupla
        const sanatciGruplari = [...new Set(liste.map(l => l.sanatci))];

        sonucKutusu.innerHTML = sanatciGruplari.map(sName => {
            const roles = liste.filter(l => l.sanatci === sName);
            return `
                <div class="artist-result-card" style="background:white; padding:20px; border-radius:12px; margin-bottom:15px; box-shadow:0 4px 10px rgba(0,0,0,0.05); border-left:6px solid var(--primary);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <h3 style="margin:0; color:var(--text);">${sName}</h3>
                            <p style="margin:5px 0; color:var(--subtext);">Bu sanatçının seslendirdiği <strong>${roles.length}</strong> karakter bulundu.</p>
                        </div>
                        <button class="search-btn" onclick="gosterSanatciProfil('${sName}')">Profili Gör</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // SANATÇI PROFİLİ: Detaylı Bilgi + Filmografi
    window.gosterSanatciProfil = function(isim) {
        const p = sanatciProfilleri[isim];
        const roller = dublajVerileri.filter(d => d.sanatci === isim);
        
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;
        
        if (!p) {
            sonucKutusu.innerHTML = `<div class="artist-profile-card"><div class="profile-body"><p class="error-msg">${isim} hakkında henüz detaylı biyografi eklenmemiş. <br><br> <strong>Seslendirdiği Filmler:</strong> ${roller.map(r => r.film).join(", ")}</p></div></div>`;
            return;
        }

        const yas = yasHesapla(p.dogumTarihi);
        const filmografiHtml = roller.map(r => `<li><strong>${r.film}</strong> - ${r.karakter}</li>`).join('');

        sonucKutusu.innerHTML = `
            <div class="artist-profile-card">
                <div class="profile-header">
                    <img src="${p.resim}" class="profile-img">
                    <div class="profile-main-info">
                        <h2>${isim}</h2>
                        <p><i class="fas fa-birthday-cake"></i> ${yas} Yaşında</p>
                    </div>
                </div>
                <div class="profile-body">
                    <div class="info-group"><div class="info-label">Doğum</div><div class="info-value">${p.dogumTarihi} / ${p.dogumYeri}</div></div>
                    <div class="info-group"><div class="info-label">Durum</div><div class="info-value">${p.durum}</div></div>
                    <div class="info-group"><div class="info-label">Ebeveynler</div><div class="info-value">${p.ebeveynler}</div></div>
                    <div class="info-group"><div class="info-label">Çocuklar</div><div class="info-value">${p.cocuklar}</div></div>
                    <div class="bio-section"><div class="info-label">Biyografi</div><p>${p.biyografi}</p></div>
                    <div class="filmography-section">
                        <div class="info-label">SESLENDİRDİĞİ KARAKTERLER</div>
                        <ul style="padding-left:20px; margin-top:10px;">${filmografiHtml}</ul>
                    </div>
                </div>
            </div>`;
    };
};
