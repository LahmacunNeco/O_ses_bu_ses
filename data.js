// --- VERİTABANI ---
const sanatciProfilleri = {
    "Okan Bayülgen": {
        resim: "images/OkanBayulgen.jpg",
        bio: "Ünlü şovmen, oyuncu ve Shrek'in Türkçe sesidir.",
        dogum: "1964, İstanbul"
    },
    "Harun Can": {
        resim: "images/HarunCan.jpg",
        bio: "Deadpool, Spider-Man gibi karakterlerin efsane sesidir.",
        dogum: "1980, Ankara"
    }
};

const dublajVerileri = [
    { 
        film: "Shrek", 
        karakter: "Shrek", 
        kResim: "images/char_shrek.jpg", 
        oSes: "Mike Myers", 
        tSes: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/Shrek1.jpg" 
    },
    { 
        film: "Shrek", 
        karakter: "Eşek", 
        kResim: "images/char_donkey.jpg", 
        oSes: "Eddie Murphy", 
        tSes: "Mehmet Ali Erbil", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/Shrek1.jpg" 
    },
    { 
        film: "Shrek 2", 
        karakter: "Shrek", 
        kResim: "images/char_shrek.jpg", 
        oSes: "Mike Myers", 
        tSes: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/Shrek2.jpg" 
    },
    { 
        film: "Shrek 2", 
        karakter: "Çizmeli Kedi", 
        kResim: "images/char_puss.jpg", 
        oSes: "Antonio Banderas", 
        tSes: "Engin Altan Düzyatan", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/Shrek2.jpg" 
    }
];

// --- MOTOR ---

function aramaYap() {
    const term = document.getElementById('searchInput').value.toLowerCase().trim();
    const type = document.querySelector('input[name="stype"]:checked').value;
    const alan = document.getElementById('sonucAlani');
    const bArea = document.getElementById('backBtnArea');

    alan.innerHTML = "";
    bArea.innerHTML = "";

    if(term.length < 2) return;

    if(type === "movie") {
        const filtrelenmis = dublajVerileri.filter(d => d.film.toLowerCase().includes(term));
        const tekiller = [...new Set(filtrelenmis.map(f => f.film))];
        
        let html = `<div class="movie-grid">`;
        tekiller.forEach(fName => {
            const veri = filtrelenmis.find(x => x.film === fName);
            html += `
                <div class="movie-card" onclick="detayGoster('${fName}')">
                    <img src="${veri.afis}" onerror="this.src='https://via.placeholder.com/180x250?text=Film'">
                    <h3>${fName}</h3>
                </div>`;
        });
        html += `</div>`;
        alan.innerHTML = html;
    } else {
        const filtrelenmis = dublajVerileri.filter(d => d.tSes.toLowerCase().includes(term));
        const isimler = [...new Set(filtrelenmis.map(f => f.tSes))];
        
        alan.innerHTML = isimler.map(isim => `
            <div class="movie-card" style="width:100%; display:flex; justify-content:space-between; align-items:center; padding:15px; margin-bottom:10px;">
                <h3 style="margin:0">${isim}</h3>
                <button class="btn-ara" onclick="profilGoster('${isim}')">Profili Gör</button>
            </div>
        `).join('');
    }
}

function detayGoster(filmAd) {
    const kadro = dublajVerileri.filter(d => d.film === filmAd);
    const alan = document.getElementById('sonucAlani');
    const bArea = document.getElementById('backBtnArea');

    bArea.innerHTML = `<button class="back-btn" onclick="aramaYap()">← Geri Dön</button>`;

    let html = `
        <div class="detail-card">
            <div class="detail-header">
                <h2>${filmAd}</h2>
                <p><strong>Stüdyo:</strong> ${kadro[0].studyo}</p>
            </div>
            <table class="cast-table">
                <thead>
                    <tr><th>Resim</th><th>Karakter</th><th>Orijinal Ses</th><th>Türkçe Ses</th></tr>
                </thead>
                <tbody>`;
    
    kadro.forEach(k => {
        html += `
            <tr>
                <td><img src="${k.kResim}" class="char-img" onerror="this.src='https://via.placeholder.com/50'"></td>
                <td><strong>${k.karakter}</strong></td>
                <td>${k.oSes}</td>
                <td><span class="artist-link" onclick="profilGoster('${k.tSes}')">${k.tSes}</span></td>
            </tr>`;
    });

    html += `</tbody></table></div>`;
    alan.innerHTML = html;
}

function profilGoster(isim) {
    const p = sanatciProfilleri[isim];
    const roller = dublajVerileri.filter(d => d.tSes === isim);
    const alan = document.getElementById('sonucAlani');
    const bArea = document.getElementById('backBtnArea');

    bArea.innerHTML = `<button class="back-btn" onclick="aramaYap()">← Geri Dön</button>`;

    alan.innerHTML = `
        <div class="detail-card" style="padding:20px;">
            <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px;">
                <img src="${p ? p.resim : ''}" style="width:120px; height:120px; border-radius:50%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/120'">
                <div>
                    <h2>${isim}</h2>
                    <p><strong>Doğum:</strong> ${p ? p.dogum : 'Bilinmiyor'}</p>
                </div>
            </div>
            <h3>Biyografi</h3>
            <p>${p ? p.bio : 'Biyografi henüz eklenmemiş.'}</p>
            <h3>Seslendirdiği Karakterler</h3>
            <ul>${roller.map(r => `<li>${r.film}: ${r.karakter}</li>`).join('')}</ul>
        </div>`;
}
