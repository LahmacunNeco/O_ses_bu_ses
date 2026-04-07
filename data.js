// --- 1. SANATÇI DETAYLI VERİTABANI ---
const sanatciProfilleri = {
    "Harun Can": {
        resim: "images/HarunCan.jpg",
        dogumTarihi: "1980-03-27",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        ebeveynler: "Bilgi Yok",
        cocuklar: "Bilgi Yok",
        biyografi: "Harun Can, Türk seslendirme sanatçısı ve müzisyendir. Özellikle Deadpool ve Örümcek Adam seslendirmeleriyle tanınır."
    },
    "Yekta Kopan": {
        resim: "images/YektaKopan.jpg",
        dogumTarihi: "1968-03-28",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        ebeveynler: "Lütfü Kopan",
        cocuklar: "Duru Kopan",
        biyografi: "Yekta Kopan, yazar ve seslendirme sanatçısıdır. Buz Devri'ndeki Sid karakteriyle efsaneleşmiştir."
    }
};

// --- 2. FİLM VE SESLENDİRME VERİLERİ ---
// YENİ FORMAT: karakterResim ve orijinalSes eklendi.
const dublajVerileri = [
    { 
        film: "Shrek", 
        karakter: "Shrek", 
        karakterResim: "images/char_shrek.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        afis: "images/Shrek.jpg" 
    },
    { 
        film: "Shrek", 
        karakter: "Eşek", 
        karakterResim: "images/char_donkey.jpg", 
        orijinalSes: "Eddie Murphy", 
        sanatci: "Mehmet Ali Erbil", 
        afis: "images/Shrek.jpg" 
    },
    { 
        film: "Deadpool", 
        karakter: "Deadpool", 
        karakterResim: "images/char_deadpool.jpg", 
        orijinalSes: "Ryan Reynolds", 
        sanatci: "Harun Can", 
        afis: "images/Deadpool.png" 
    },
    { 
        film: "Buz Devri", 
        karakter: "Sid", 
        karakterResim: "images/char_sid.jpg", 
        orijinalSes: "John Leguizamo", 
        sanatci: "Yekta Kopan", 
        afis: "images/BuzDevri.jpeg" 
    }
];

// --- 3. SİSTEM MANTIĞI ---

window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const sonucKutusu = document.getElementById('sonucAlani');
    const backButtonContainer = document.getElementById('backButtonContainer');

    function yasHesapla(dogumStr) {
        if(!dogumStr || dogumStr === "Bilgi Yok") return "Bilinmiyor";
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
            const bulunanlar = dublajVerileri.filter(d => d.film.toLocaleLowerCase('tr').includes(aranan));
            gosterFilmSecimListesi(bulunanlar);
        } else {
            const bulunanlar = dublajVerileri.filter(d => d.sanatci.toLocaleLowerCase('tr').includes(aranan));
            gosterSanatciSonuclari(bulunanlar);
        }
    };

    function gosterFilmSecimListesi(liste) {
        if (liste.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Film bulunamadı.</p>"; return; }
        const tekilFilmler = {};
        liste.forEach(item => { if (!tekilFilmler[item.film]) tekilFilmler[item.film] = item.afis; });

        let html = `<div id="filmSecimListesi">`;
        Object.keys(tekilFilmler).forEach(fName => {
            const safeName = fName.replace(/'/g, "\\'");
            html += `
                <div class="film-secim-karti" onclick="gosterFilmDetay('${safeName}')">
                    <img src="${tekilFilmler[fName]}" onerror="this.src='https://via.placeholder.com/160x230?text=Afiş+Yok'">
                    <h4>${fName}</h4>
                </div>`;
        });
        html += `</div>`;
        sonucKutusu.innerHTML = html;
    }

    window.gosterFilmDetay = function(fName) {
        const kadro = dublajVerileri.filter(d => d.film === fName);
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;
        
        let kadroHtml = kadro.map(k => `
            <div class="cast-row">
                <img src="${k.karakterResim}" class="char-img" onerror="this.src='https://via.placeholder.com/50?text=? '">
                <div class="char-name">${k.karakter}</div>
                <div class="orig-actor">Orijinal: ${k.orijinalSes}</div>
                <div class="artist-link" onclick="gosterSanatciProfil('${k.sanatci.replace(/'/g, "\\'")}')">TR: ${k.sanatci}</div>
            </div>
        `).join('');

        sonucKutusu.innerHTML = `
            <div class="movie-result-card">
                <div class="movie-header">${fName} Seslendirme Kadrosu</div>
                <div class="cast-container">
                    <div class="cast-header-row">
                        <div>Görsel</div><div>Karakter</div><div>Orijinal Ses</div><div>Türkçe Ses</div>
                    </div>
                    ${kadroHtml}
                </div>
            </div>`;
    };

    function gosterSanatciSonuclari(liste) {
        if (liste.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Sanatçı bulunamadı.</p>"; return; }
        const sanatciGruplari = [...new Set(liste.map(l => l.sanatci))];

        sonucKutusu.innerHTML = sanatciGruplari.map(sName => {
            const roles = liste.filter(l => l.sanatci === sName);
            return `
                <div class="artist-result-card" style="background:white; padding:20px; border-radius:12px; margin-bottom:15px; box-shadow:0 4px 10px rgba(0,0,0,0.05); border-left:6px solid var(--primary);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <h3 style="margin:0; color:var(--text);">${sName}</h3>
                            <p style="margin:5px 0; color:var(--subtext);">Sistemde kayıtlı <strong>${roles.length}</strong> karakteri var.</p>
                        </div>
                        <button class="search-btn" onclick="gosterSanatciProfil('${sName.replace(/'/g, "\\'")}')">Profili Gör</button>
                    </div>
                </div>`;
        }).join('');
    }

    window.gosterSanatciProfil = function(isim) {
        const p = sanatciProfilleri[isim];
        const roller = dublajVerileri.filter(d => d.sanatci === isim);
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;
        
        const yas = p ? yasHesapla(p.dogumTarihi) : "Bilinmiyor";
        const biyografi = p ? p.biyografi : "Bu sanatçı hakkında henüz detaylı biyografi eklenmemiş.";
        const resim = p ? p.resim : 'https://via.placeholder.com/150?text=Resim+Yok';

        sonucKutusu.innerHTML = `
            <div class="artist-profile-card">
                <div class="profile-header">
                    <img src="${resim}" class="profile-img" onerror="this.src='https://via.placeholder.com/150?text=Resim+Yok'">
                    <div class="profile-main-info">
                        <h2 style="margin:0">${isim}</h2>
                        <p style="margin:10px 0 0 0"><i class="fas fa-birthday-cake"></i> ${yas} Yaşında</p>
                    </div>
                </div>
                <div class="profile-body">
                    <div class="info-group"><div class="info-label">Doğum Tarihi</div><div class="info-value">${p ? p.dogumTarihi : 'Bilgi Yok'}</div></div>
                    <div class="info-group"><div class="info-label">Doğum Yeri</div><div class="info-value">${p ? p.dogumYeri : 'Bilgi Yok'}</div></div>
                    <div class="info-group"><div class="info-label">Durum</div><div class="info-value">${p ? p.durum : 'Bilgi Yok'}</div></div>
                    <div class="info-group"><div class="info-label">Çocuklar</div><div class="info-value">${p ? p.cocuklar : 'Bilgi Yok'}</div></div>
                    <div class="bio-section"><div class="info-label">Biyografi</div><p>${biyografi}</p></div>
                    <div class="filmography-section">
                        <div class="info-label">SESLENDİRDİĞİ KARAKTERLER</div>
                        <ul class="filmography-list">
                            ${roller.map(r => `<li><img src="${r.karakterResim}" style="width:30px; height:30px; border-radius:50%; vertical-align:middle; margin-right:10px;"> <strong>${r.film}</strong>: ${r.karakter} (Orijinal: ${r.orijinalSes})</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>`;
    };
};
