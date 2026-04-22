// --- 1. SANATÇI VERİTABANI ---
const sanatciProfilleri = {
    "Harun Can": {
        resim: "images/HarunCan.jpg",
        dogumTarihi: "1980-03-27",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        cocuklar: "Bilgi Yok",
        biyografi: "Harun Can, Türk seslendirme sanatçısıdır. Deadpool ve Örümcek Adam seslendirmeleriyle efsaneleşmiştir."
    },
    "Okan Bayülgen": {
        resim: "images/OkanBayulgen.jpg",
        dogumTarihi: "1964-03-23",
        dogumYeri: "İstanbul",
        durum: "Hayatta",
        cocuklar: "İstanbul Bayülgen",
        biyografi: "Ünlü şovmen ve oyuncu, Shrek karakterine verdiği ikonik sesle dublaj dünyasında devrim yapmıştır."
    },
    "Yekta Kopan": {
        resim: "images/YektaKopan.jpg",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        biyografi: "Yazar ve seslendirme sanatçısıdır. Buz Devri'ndeki Sid karakteriyle tanınır."
    }
};

// --- 2. FİLM VE SESLENDİRME VERİLERİ ---
const dublajVerileri = [
    { 
        film: "Shrek", 
        karakter: "Shrek", 
        karakterResim: "images/char_shrek.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları",
        afis: "images/Shrek.jpg" 
    },
    { 
        film: "Shrek", 
        karakter: "Eşek", 
        karakterResim: "images/char_donkey.jpg", 
        orijinalSes: "Eddie Murphy", 
        sanatci: "Mehmet Ali Erbil", 
        studyo: "İmaj Stüdyoları",
        afis: "images/Shrek.jpg" 
    },
    { 
        film: "Shrek 2", 
        karakter: "Shrek", 
        karakterResim: "images/char_shrek.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları",
        afis: "images/Shrek2.jpg" 
    },
    { 
        film: "Shrek 2", 
        karakter: "Çizmeli Kedi", 
        karakterResim: "images/char_puss.jpg", 
        orijinalSes: "Antonio Banderas", 
        sanatci: "Engin Altan Düzyatan", 
        studyo: "İmaj Stüdyoları",
        afis: "images/Shrek2.jpg" 
    },
    { 
        film: "Deadpool", 
        karakter: "Deadpool", 
        karakterResim: "images/char_deadpool.jpg", 
        orijinalSes: "Ryan Reynolds", 
        sanatci: "Harun Can", 
        studyo: "Vera Stüdyoları",
        afis: "images/Deadpool.png" 
    }
];

// --- 3. SİSTEM MANTIĞI ---

function aramaYap() {
    const input = document.getElementById('searchInput');
    const sonucAlani = document.getElementById('sonucAlani');
    const backBtn = document.getElementById('backButtonContainer');
    const aranan = input.value.trim().toLocaleLowerCase('tr');
    const tip = document.querySelector('input[name="searchType"]:checked').value;

    sonucAlani.innerHTML = "";
    backBtn.innerHTML = "";

    if (aranan.length < 2) return;

    if (tip === 'movie') {
        const sonuclar = dublajVerileri.filter(d => d.film.toLocaleLowerCase('tr').includes(aranan));
        if (sonuclar.length === 0) {
            sonucAlani.innerHTML = "<p class='error-msg'>Film bulunamadı.</p>";
            return;
        }

        // Tekil film listesi oluştur (Shrek 1 ve 2'yi ayrı ayrı göstermek için)
        const tekilFilmler = {};
        sonuclar.forEach(s => { if(!tekilFilmler[s.film]) tekilFilmler[s.film] = s.afis; });

        let gridHtml = `<div class="movie-grid">`;
        Object.keys(tekilFilmler).forEach(filmAd => {
            gridHtml += `
                <div class="movie-card" onclick="filmDetayGoster('${filmAd}')">
                    <img src="${tekilFilmler[filmAd]}" onerror="this.src='https://via.placeholder.com/180x250?text=Afiş'">
                    <h4>${filmAd}</h4>
                </div>`;
        });
        gridHtml += `</div>`;
        sonucAlani.innerHTML = gridHtml;
    } else {
        const sonuclar = dublajVerileri.filter(d => d.sanatci.toLocaleLowerCase('tr').includes(aranan));
        const isimler = [...new Set(sonuclar.map(s => s.sanatci))];
        
        if (isimler.length === 0) {
            sonucAlani.innerHTML = "<p class='error-msg'>Sanatçı bulunamadı.</p>";
            return;
        }

        sonucAlani.innerHTML = isimler.map(isim => `
            <div class="movie-card" style="width:100%; text-align:left; padding:20px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h3 style="margin:0">${isim}</h3>
                <button class="search-btn" onclick="sanatciProfilGoster('${isim}')">Profili Gör</button>
            </div>
        `).join('');
    }
}

function filmDetayGoster(filmAd) {
    const kadro = dublajVerileri.filter(d => d.film === filmAd);
    const studyo = kadro[0].studyo || "Bilinmiyor";
    const sonucAlani = document.getElementById('sonucAlani');
    const backBtn = document.getElementById('backButtonContainer');

    backBtn.innerHTML = `<button class="back-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;

    let tabloHtml = `
        <div class="detail-card">
            <div class="detail-header">
                <h2 style="margin:0; color:var(--primary)">${filmAd}</h2>
                <div class="studio-badge"><i class="fas fa-building"></i> Stüdyo: ${studyo}</div>
            </div>
            <table class="cast-table">
                <thead>
                    <tr>
                        <th>Görsel</th>
                        <th>Karakter</th>
                        <th>Orijinal Ses</th>
                        <th>Türkçe Seslendirmen</th>
                    </tr>
                </thead>
                <tbody>`;

    kadro.forEach(k => {
        tabloHtml += `
            <tr>
                <td style="width:70px"><img src="${k.karakterResim}" class="char-img" onerror="this.src='https://via.placeholder.com/50?text=?'"></td>
                <td style="font-weight:bold">${k.karakter}</td>
                <td style="color:var(--subtext)">${k.orijinalSes}</td>
                <td><span class="artist-link" onclick="sanatciProfilGoster('${k.sanatci}')">${k.sanatci}</span></td>
            </tr>`;
    });

    tabloHtml += `</tbody></table></div>`;
    sonucAlani.innerHTML = tabloHtml;
}

function sanatciProfilGoster(isim) {
    const p = sanatciProfilleri[isim];
    const roller = dublajVerileri.filter(d => d.sanatci === isim);
    const sonucAlani = document.getElementById('sonucAlani');
    const backBtn = document.getElementById('backButtonContainer');

    backBtn.innerHTML = `<button class="back-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;

    sonucAlani.innerHTML = `
        <div class="detail-card">
            <div class="profile-header">
                <img src="${p ? p.resim : 'https://via.placeholder.com/150'}" class="profile-img" onerror="this.src='https://via.placeholder.com/150'">
                <div>
                    <h2 style="margin:0">${isim}</h2>
                    <p style="margin-top:10px; opacity:0.9"><i class="fas fa-map-marker-alt"></i> ${p ? p.dogumYeri : 'Bilinmiyor'}</p>
                </div>
            </div>
            <div class="profile-content">
                <h3>Biyografi</h3>
                <p style="line-height:1.6">${p ? p.biyografi : 'Bu sanatçı için biyografi henüz eklenmemiş.'}</p>
                <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
                <h3>Seslendirdiği Karakterler</h3>
                <ul>
                    ${roller.map(r => `<li><strong>${r.film}</strong>: ${r.karakter} (Stüdyo: ${r.studyo})</li>`).join('')}
                </ul>
            </div>
        </div>`;
}

// Enter tuşu ile arama yapma desteği
document.getElementById('searchInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') aramaYap();
});
