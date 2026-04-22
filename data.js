// 1. VERİLER (Burası senin kütüphanen)
const dublajVerileri = [
    { 
        film: "Shrek", 
        karakter: "Shrek", 
        karakterResim: "images/shrek1_shrek.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/shrek1_afis.jpg" 
    },
    { 
        film: "Shrek", 
        karakter: "Eşek", 
        karakterResim: "images/shrek1_donkey.jpg", 
        orijinalSes: "Eddie Murphy", 
        sanatci: "Mehmet Ali Erbil", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/shrek1_afis.jpg" 
    },
    { 
        film: "Shrek 2", 
        karakter: "Shrek", 
        karakterResim: "images/shrek2_shrek.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/shrek2_afis.jpg" 
    },
    { 
        film: "Shrek 2", 
        karakter: "Çizmeli Kedi", 
        karakterResim: "images/shrek2_puss.jpg", 
        orijinalSes: "Antonio Banderas", 
        sanatci: "Engin Altan Düzyatan", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/shrek2_afis.jpg" 
    }
];

// Sanatçı detayları (Profil için)
const sanatciBilgileri = {
    "Okan Bayülgen": { dogum: "1964, İstanbul", bio: "Ünlü şovmen ve seslendirme sanatçısı." },
    "Engin Altan Düzyatan": { dogum: "1979, İzmir", bio: "Başarılı oyuncu ve seslendirme sanatçısı." }
};

// 2. FONKSİYONLAR (Sistemin kalbi)

function aramaYap() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const type = document.querySelector('input[name="searchType"]:checked').value;
    const alan = document.getElementById('sonucAlani');
    const nav = document.getElementById('navArea');

    alan.innerHTML = "";
    nav.innerHTML = "";

    if (input.length < 2) return;

    if (type === "movie") {
        // Filmleri filtrele
        const sonuclar = dublajVerileri.filter(d => d.film.toLowerCase().includes(input));
        // Aynı filmi birden fazla göstermemek için grupla
        const tekilFilmler = [...new Set(sonuclar.map(s => s.film))];

        if (tekilFilmler.length === 0) {
            alan.innerHTML = "<b>Sonuç bulunamadı.</b>";
            return;
        }

        let html = `<div class="results-grid">`;
        tekilFilmler.forEach(fName => {
            const filmVerisi = sonuclar.find(x => x.film === fName);
            html += `
                <div class="movie-card" onclick="filmDetayGetir('${fName}')">
                    <img src="${filmVerisi.afis}" onerror="this.src='https://via.placeholder.com/160x220?text=Film'">
                    <h4>${fName}</h4>
                </div>`;
        });
        html += `</div>`;
        alan.innerHTML = html;

    } else {
        // Sanatçı ara
        const sonuclar = dublajVerileri.filter(d => d.sanatci.toLowerCase().includes(input));
        const isimler = [...new Set(sonuclar.map(s => s.sanatci))];

        alan.innerHTML = isimler.map(isim => `
            <div class="movie-card" style="width:100%; display:flex; justify-content:space-between; align-items:center; padding:15px; margin-bottom:10px;">
                <h3 style="margin:0">${isim}</h3>
                <button class="btn" onclick="sanatciProfilGetir('${isim}')">Profili Gör</button>
            </div>
        `).join('');
    }
}

function filmDetayGetir(filmAdi) {
    const kadro = dublajVerileri.filter(d => d.film === filmAdi);
    const alan = document.getElementById('sonucAlani');
    const nav = document.getElementById('navArea');

    nav.innerHTML = `<button class="back-btn" onclick="aramaYap()">← Geri Dön</button>`;

    let html = `
        <div class="detail-box">
            <div class="detail-header">
                <h2 style="margin:0">${filmAdi}</h2>
                <div class="studio-text"><i class="fas fa-building"></i> Stüdyo: ${kadro[0].studyo}</div>
            </div>
            <table>
                <tr><th>Resim</th><th>Karakter</th><th>Orijinal Ses</th><th>Türkçe Ses</th></tr>`;
    
    kadro.forEach(k => {
        html += `
            <tr>
                <td><img src="${k.karakterResim}" class="char-thumb" onerror="this.src='https://via.placeholder.com/50'"></td>
                <td><b>${k.karakter}</b></td>
                <td>${k.orijinalSes}</td>
                <td><span style="color:var(--primary); cursor:pointer; font-weight:bold" onclick="sanatciProfilGetir('${k.sanatci}')">${k.sanatci}</span></td>
            </tr>`;
    });

    html += `</table></div>`;
    alan.innerHTML = html;
}

function sanatciProfilGetir(isim) {
    const p = sanatciBilgileri[isim];
    const roller = dublajVerileri.filter(d => d.sanatci === isim);
    const alan = document.getElementById('sonucAlani');
    const nav = document.getElementById('navArea');

    nav.innerHTML = `<button class="back-btn" onclick="aramaYap()">← Geri Dön</button>`;

    alan.innerHTML = `
        <div class="detail-box" style="padding:20px;">
            <h2>${isim}</h2>
            <p><b>Doğum:</b> ${p ? p.dogum : 'Bilinmiyor'}</p>
            <p><b>Biyografi:</b> ${p ? p.bio : 'Eklenmemiş.'}</p>
            <hr>
            <h4>Seslendirdiği Karakterler:</h4>
            <ul>
                ${roller.map(r => `<li>${r.film} - ${r.karakter} (${r.studyo})</li>`).join('')}
            </ul>
        </div>`;
}
