// --- 1. SANATÇI DETAYLI VERİTABANI ---
const sanatciProfilleri = {
    "Harun Can": {
        resim: "images/HarunCan.jpg",
        dogumTarihi: "1980-03-27",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        ebeveynler: "Bilgi Yok",
        cocuklar: "Bilgi Yok",
        biyografi: "Harun Can, Türk seslendirme dünyasının en aktif isimlerinden biridir."
    },
    "Okan Bayülgen": {
        resim: "images/OkanBayulgen.jpg",
        dogumTarihi: "1964-03-23",
        dogumYeri: "İstanbul",
        durum: "Hayatta",
        ebeveynler: "Bilgi Yok",
        cocuklar: "İstanbul Bayülgen",
        biyografi: "Ünlü şovmen, Shrek karakterine verdiği sesle dublaj tarihinde ikonik bir yer edinmiştir."
    }
};

// --- 2. FİLM VE SESLENDİRME VERİLERİ (Stüdyo Eklendi) ---
const dublajVerileri = [
    { 
        film: "Shrek", 
        karakter: "Shrek", 
        karakterResim: "images/shrek_char.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        studyo: "Imaj Stüdyoları", // <--- YENİ ALAN
        afis: "images/Shrek.jpg" 
    },
    { 
        film: "Shrek", 
        karakter: "Eşek", 
        karakterResim: "images/donkey_char.jpg", 
        orijinalSes: "Eddie Murphy", 
        sanatci: "Mehmet Ali Erbil", 
        studyo: "Imaj Stüdyoları", 
        afis: "images/Shrek.jpg" 
    },
    { 
        film: "Deadpool", 
        karakter: "Deadpool", 
        karakterResim: "images/deadpool_char.jpg", 
        orijinalSes: "Ryan Reynolds", 
        sanatci: "Harun Can", 
        studyo: "Vera Stüdyoları", 
        afis: "images/Deadpool.png" 
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
            html += `
                <div class="film-secim-karti" onclick="gosterFilmDetay('${fName.replace(/'/g, "\\'")}')">
                    <img src="${tekilFilmler[fName]}" onerror="this.src='https://via.placeholder.com/160x230?text=Resim+Yok'">
                    <h4>${fName}</h4>
                </div>`;
        });
        html += `</div>`;
        sonucKutusu.innerHTML = html;
    }

    window.gosterFilmDetay = function(fName) {
        const kadro = dublajVerileri.filter(d => d.film === fName);
        const studyoAdi = kadro[0].studyo || "Bilinmiyor"; // Stüdyoyu alıyoruz
        
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;
        
        let kadroHtml = kadro.map(k => `
            <div class="cast-row">
                <img src="${k.karakterResim}" class="char-img" onerror="this.src='https://via.placeholder.com/50?text=? '">
                <div style="font-weight:600">${k.karakter}</div>
                <div style="color:var(--subtext)">${k.orijinalSes}</div>
                <div class="artist-link" onclick="gosterSanatciProfil('${k.sanatci.replace(/'/g, "\\'")}')">${k.sanatci}</div>
            </div>
        `).join('');

        sonucKutusu.innerHTML = `
            <div class="movie-result-card">
                <div class="movie-header-box">
                    <div class="movie-title">${fName}</div>
                    <div class="studio-info"><i class="fas fa-building"></i> Dublaj Stüdyosu: ${studyoAdi}</div>
                </div>
                <div class="cast-container">
                    <div class="cast-header-row">
                        <div>Görsel</div><div>Karakter</div><div>Orijinal Ses</div><div>Türkçe Ses</div>
                    </div>
                    ${kadroHtml}
                </div>
            </div>`;
    };

    function gosterSanatciSonuclari(liste) {
        const sanatciGruplari = [...new Set(liste.map(l => l.sanatci))];
        sonucKutusu.innerHTML = sanatciGruplari.map(sName => {
            const roles = liste.filter(l => l.sanatci === sName);
            return `
                <div class="artist-result-card" style="background:white; padding:20px; border-radius:12px; margin-bottom:15px; border-left:6px solid var(--primary);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <h3>${sName}</h3>
                            <p>Sistemde <strong>${roles.length}</strong> karakteri var.</p>
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

        sonucKutusu.innerHTML = `
            <div class="artist-profile-card">
                <div class="profile-header">
                    <img src="${p ? p.resim : 'https://via.placeholder.com/150'}" class="profile-img" onerror="this.src='https://via.placeholder.com/150'">
                    <div>
                        <h2>${isim}</h2>
                        <p><i class="fas fa-birthday-cake"></i> ${yas} Yaşında</p>
                    </div>
                </div>
                <div class="profile-body">
                    <div class="info-group"><div class="info-label">Doğum Tarihi</div><div>${p ? p.dogumTarihi : 'Bilgi Yok'}</div></div>
                    <div class="info-group"><div class="info-label">Doğum Yeri</div><div>${p ? p.dogumYeri : 'Bilgi Yok'}</div></div>
                    <div class="info-group"><div class="info-label">Durum</div><div>${p ? p.durum : 'Bilgi Yok'}</div></div>
                    <div class="info-group"><div class="info-label">Çocuklar</div><div>${p ? p.cocuklar : 'Bilgi Yok'}</div></div>
                    <div class="bio-section"><div class="info-label">Biyografi</div><p>${p ? p.biyografi : 'Eklenmemiş.'}</p></div>
                    <div class="filmography-section">
                        <div class="info-label">SESLENDİRDİĞİ KARAKTERLER</div>
                        <ul style="padding:10px 0; list-style:none;">
                            ${roller.map(r => `<li><i class="fas fa-chevron-right" style="font-size:0.7rem; color:var(--primary)"></i> <strong>${r.film}</strong>: ${r.karakter} (Stüdyo: ${r.studyo})</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>`;
    };
};
