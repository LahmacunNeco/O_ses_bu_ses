// --- 1. SANATÇI VERİTABANI ---
const sanatciProfilleri = {
    "Harun Can": {
        resim: "images/HarunCan.jpg",
        dogumTarihi: "1980-03-27",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        cocuklar: "Bilgi Yok",
        biyografi: "Harun Can, Türk seslendirme sanatçısı, müzisyen ve oyuncudur. Özellikle Deadpool, Örümcek Adam gibi karakterlerle tanınır."
    },
    "Okan Bayülgen": {
        resim: "images/OkanBayulgen.jpg",
        dogumTarihi: "1964-03-23",
        dogumYeri: "İstanbul",
        durum: "Hayatta",
        cocuklar: "İstanbul Bayülgen",
        biyografi: "Sinema oyuncusu, gece kuşu programlarının yaratıcısı ve Shrek'in unutulmaz Türkçe sesidir."
    },
    "Yekta Kopan": {
        resim: "images/YektaKopan.jpg",
        dogumTarihi: "1968-03-28",
        dogumYeri: "Ankara",
        durum: "Hayatta",
        cocuklar: "Duru Kopan",
        biyografi: "Yazar ve seslendirme sanatçısıdır. Buz Devri'ndeki Sid karakteriyle hafızalara kazınmıştır."
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

// --- 3. SİSTEM MOTORU ---

window.onload = function() {
    const searchInput = document.getElementById('searchInput');
    const sonucKutusu = document.getElementById('sonucAlani');
    const backButtonContainer = document.getElementById('backButtonContainer');

    // Yaş Hesaplama
    function yasHesapla(dogum) {
        if(!dogum || dogum === "Bilgi Yok") return "?";
        const dYili = new Date(dogum).getFullYear();
        return new Date().getFullYear() - dYili;
    }

    // Arama Fonksiyonu
    window.aramaYap = function() {
        const aranan = searchInput.value.trim().toLocaleLowerCase('tr');
        const tip = document.querySelector('input[name="searchType"]:checked').value;
        
        sonucKutusu.innerHTML = "";
        backButtonContainer.innerHTML = "";

        if (aranan.length < 2) return;

        if (tip === 'movie') {
            const sonuclar = dublajVerileri.filter(d => d.film.toLocaleLowerCase('tr').includes(aranan));
            gosterFilmIzgara(sonuclar);
        } else {
            const sonuclar = dublajVerileri.filter(d => d.sanatci.toLocaleLowerCase('tr').includes(aranan));
            gosterSanatciListe(sonuclar);
        }
    };

    // Filmleri Resimli Izgara Olarak Göster
    function gosterFilmIzgara(liste) {
        if (liste.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Film bulunamadı.</p>"; return; }
        
        const tekilFilmler = {};
        liste.forEach(item => { if(!tekilFilmler[item.film]) tekilFilmler[item.film] = item.afis; });

        let html = `<div id="filmSecimListesi">`;
        Object.keys(tekilFilmler).forEach(fName => {
            html += `
                <div class="film-secim-karti" onclick="gosterFilmDetay('${fName.replace(/'/g, "\\"')}')">
                    <img src="${tekilFilmler[fName]}" onerror="this.src='https://via.placeholder.com/160x230?text=Afiş+Yok'">
                    <h4>${fName}</h4>
                </div>`;
        });
        html += `</div>`;
        sonucKutusu.innerHTML = html;
    }

    // Film Detay Tablosu
    window.gosterFilmDetay = function(fName) {
        const kadro = dublajVerileri.filter(d => d.film === fName);
        const studyo = kadro[0].studyo || "Bilinmiyor";

        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;

        let rows = kadro.map(k => `
            <tr>
                <td>
                    <div class="char-cell">
                        <img src="${k.karakterResim}" class="char-img" onerror="this.src='https://via.placeholder.com/50?text=? '">
                        <span style="font-weight:600">${k.karakter}</span>
                    </div>
                </td>
                <td><span style="color:#777">${k.orijinalSes}</span></td>
                <td><span class="artist-link" onclick="gosterSanatciProfil('${k.sanatci.replace(/'/g, "\\")}')">${k.sanatci}</span></td>
            </tr>
        `).join('');

        sonucKutusu.innerHTML = `
            <div class="movie-card">
                <div class="movie-header">
                    <h2 class="movie-title">${fName}</h2>
                    <span class="studio-tag"><i class="fas fa-building"></i> ${studyo}</span>
                </div>
                <table class="cast-table">
                    <thead>
                        <tr><th>Karakter</th><th>Orijinal Ses</th><th>Türkçe Ses</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;
    };

    // Sanatçı Arama Sonuçları
    function gosterSanatciListe(liste) {
        if (liste.length === 0) { sonucKutusu.innerHTML = "<p class='error-msg'>Sanatçı bulunamadı.</p>"; return; }
        
        const isimler = [...new Set(liste.map(l => l.sanatci))];
        sonucKutusu.innerHTML = isimler.map(isim => `
            <div class="film-secim-karti" style="width:100%; text-align:left; padding:20px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <div>
                    <h3 style="margin:0">${isim}</h3>
                    <small style="color:var(--subtext)">Sistemde kayıtlı seslendirmeleri var.</small>
                </div>
                <button class="search-btn" onclick="gosterSanatciProfil('${isim.replace(/'/g, "\\")}')">Profili Gör</button>
            </div>
        `).join('');
    }

    // Sanatçı Profil Kartı
    window.gosterSanatciProfil = function(isim) {
        const p = sanatciProfilleri[isim];
        const roller = dublajVerileri.filter(d => d.sanatci === isim);
        
        backButtonContainer.innerHTML = `<button class="geri-btn" onclick="aramaYap()"><i class="fas fa-arrow-left"></i> Geri Dön</button>`;

        const resim = p ? p.resim : "https://via.placeholder.com/150";
        const yas = p ? yasHesapla(p.dogumTarihi) : "?";

        sonucKutusu.innerHTML = `
            <div class="profile-card">
                <div class="profile-top">
                    <img src="${resim}" class="profile-img" onerror="this.src='https://via.placeholder.com/150'">
                    <div>
                        <h2 style="margin:0; font-size:2rem;">${isim}</h2>
                        <p style="margin:5px 0 opacity:0.8;"><i class="fas fa-birthday-cake"></i> ${yas} Yaşında</p>
                    </div>
                </div>
                <div class="profile-info">
                    <div><strong>Doğum Tarihi:</strong> ${p ? p.dogumTarihi : 'Bilinmiyor'}</div>
                    <div><strong>Doğum Yeri:</strong> ${p ? p.dogumYeri : 'Bilinmiyor'}</div>
                    <div class="bio-box"><strong>Biyografi:</strong><p>${p ? p.biyografi : 'Bilgi henüz eklenmemiş.'}</p></div>
                    <div class="film-box">
                        <strong>SESLENDİRDİĞİ KARAKTERLER:</strong>
                        <ul style="margin-top:10px; padding-left:20px;">
                            ${roller.map(r => `<li><strong>${r.film}</strong>: ${r.karakter} (Stüdyo: ${r.studyo})</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>`;
    };
};
