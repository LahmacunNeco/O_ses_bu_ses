// 1. VERİLER 
const dublajVerileri = [
    //SHREK 1
    { 
        film: "Shrek", 
        karakter: "Shrek", 
        karakterResim: "images/filmler/Shrek/Shrek.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Fiona", 
        karakterResim: "images/filmler/Shrek/Fiona.jpg", 
        orijinalSes: "Cameron Diaz", 
        sanatci: "Oya Prosçiler", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Eşek", 
        karakterResim: "images/filmler/Shrek/Esek.jpg", 
        orijinalSes: "Eddie Murphy", 
        sanatci: "Mehmet Ali Erbil", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg" 
    },
    { 
        film: "Shrek", 
        karakter: "Lord Farquaad", 
        karakterResim: "images/filmler/Shrek/LordFarquaad.jpg", 
        orijinalSes: "John Lithgow", 
        sanatci: "Hakan Vanlı", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Pinokyo", 
        karakterResim: "images/filmler/Shrek/Pinokyo.jpg", 
        orijinalSes: "Cody Cameron", 
        sanatci: "Özgür Özdural", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Robin Hood", 
        karakterResim: "images/filmler/Shrek/RobinHood.jpg", 
        orijinalSes: "Vincent Cassel", 
        sanatci: "Volkan Severcan", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Sihirli Ayna", 
        karakterResim: "images/filmler/Shrek/SihirliAyna.png", 
        orijinalSes: "Chris Miller", 
        sanatci: "Ayhan Kahya", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Kurabiye Adam", 
        karakterResim: "images/filmler/Shrek/KurabiyeAdam.jpg", 
        orijinalSes: "Conrad Vernon", 
        sanatci: "Ziya Kürküt", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Geppetto", 
        karakterResim: "images/filmler/Shrek/Geppetto.jpg", 
        orijinalSes: "Chris Miller", 
        sanatci: "Murat Şenol", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Muhafızların Lideri", 
        karakterResim: "images/filmler/Shrek/MuhafizlarınLideri.jpg", 
        orijinalSes: "Jim Cummings", 
        sanatci: "Ali Ekber Diribaş", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Domuz", 
        karakterResim: "images/filmler/Shrek/Domuz.jpg", 
        orijinalSes: "Cody Cameron", 
        sanatci: "Emin Yaraç", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Kör Fare #1", 
        karakterResim: "images/filmler/Shrek/KorFareE.jpg", 
        orijinalSes: "Christopher Knights", 
        sanatci: "Emin Yaraç", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Kör Fare #2", 
        karakterResim: "images/filmler/Shrek/KorFareK.jpg", 
        orijinalSes: "Simon J. Smith", 
        sanatci: "Kerem Atabeyoğlu", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Kurt", 
        karakterResim: "images/filmler/Shrek/Kurt.jpg", 
        orijinalSes: "Aron Warner", 
        sanatci: "İsmail Yıldız", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Yaşlı Kadın", 
        karakterResim: "images/filmler/Shrek/YaslıKadin.jpg", 
        orijinalSes: "Kathleen Freeman", 
        sanatci: "Bedia Ener", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Thelonious", 
        karakterResim: "images/filmler/Shrek/YaslıKadin.jpg", 
        orijinalSes: "Christopher Knights", 
        sanatci: "Murat Şenol", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    { 
        film: "Shrek", 
        karakter: "Rahip", 
        karakterResim: "images/filmler/Shrek/Rahip.jpg", 
        orijinalSes: "Val Bettin", 
        sanatci: "Zafer Önen", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek1.jpg"
    },
    
    //SHREK 2
    { 
        film: "Shrek 2", 
        karakter: "Shrek", 
        karakterResim: "images/filmler/Shrek/Shrek.jpg", 
        orijinalSes: "Mike Myers", 
        sanatci: "Okan Bayülgen", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek2.jpg" 
    },
    { 
        film: "Shrek 2", 
        karakter: "Çizmeli Kedi", 
        karakterResim: "images/filmler/Shrek/CizmeliKedi.jpg", 
        orijinalSes: "Antonio Banderas", 
        sanatci: "Engin Alkan", 
        studyo: "İmaj Stüdyoları", 
        afis: "images/filmler/Shrek/Shrek2.jpg" 
    }
];

const sanatciBilgileri = {
    "Okan Bayülgen": { 
        resim: "images/OkanBayulgen.jpg", 
        dogum: "1964, İstanbul", 
        bio: "Ünlü şovmen ve seslendirme sanatçısı." 
    },
    "Engin Alkan": { 
        resim: "images/EnginAlkan.jpg", 
        dogum: "1979, İzmir", 
        bio: "Başarılı oyuncu ve seslendirme sanatçısı." 
    },
    "Mehmet Ali Erbil": { 
        resim: "images/MehmetAliErbil.jpg", 
        dogum: "1957, İstanbul", 
        bio: "Ünlü sunucu ve seslendirme sanatçısı." 
    }
};

// 2. FONKSİYONLAR

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    if(input) {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                aramaYap();
            }
        });
    }
});

function aramaYap() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const type = document.querySelector('input[name="searchType"]:checked').value;
    const alan = document.getElementById('sonucAlani');
    const nav = document.getElementById('navArea');

    if (input.length === 0) {
        alan.innerHTML = "";
        nav.innerHTML = "";
        return;
    }

    alan.innerHTML = "";
    nav.innerHTML = "";

    if (input.length < 2) return;

    if (type === "movie") {
        const sonuclar = dublajVerileri.filter(d => d.film.toLowerCase().includes(input));
        const tekilFilmler = [...new Set(sonuclar.map(s => s.film))];

        if (tekilFilmler.length === 0) {
            alan.innerHTML = "<p style='text-align:center'>Sonuç bulunamadı.</p>";
            return;
        }

        let html = `<div class="results-grid">`;
        tekilFilmler.forEach(fName => {
            const filmVerisi = sonuclar.find(x => x.film === fName);
            html += `
                <div class="movie-card" onclick="filmDetayGetir('${fName}')">
                    <img src="${filmVerisi.afis}" onerror="this.src='https://via.placeholder.com/160x220?text=Afiş+Yok'">
                    <h4>${fName}</h4>
                </div>`;
        });
        html += `</div>`;
        alan.innerHTML = html;

    } else {
        const sonuclar = dublajVerileri.filter(d => d.sanatci.toLowerCase().includes(input));
        const isimler = [...new Set(sonuclar.map(s => s.sanatci))];

        if (isimler.length === 0) {
            alan.innerHTML = "<p style='text-align:center'>Sanatçı bulunamadı.</p>";
            return;
        }

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
                <td><img src="${k.karakterResim}" class="char-thumb" onerror="this.src='https://via.placeholder.com/50?text=?'"></td>
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
        <div class="detail-box" style="padding:20px; text-align:center;">
            <img src="${p && p.resim ? p.resim : 'https://via.placeholder.com/150?text=Sanatci'}" 
                 style="width:150px; height:150px; border-radius:50%; object-fit:cover; margin-bottom:15px; border:4px solid var(--primary);"
                 onerror="this.src='https://via.placeholder.com/150?text=Yok'">
            
            <h2 style="margin:0">${isim}</h2>
            <div style="text-align:left; margin-top:20px;">
                <p><b>Doğum:</b> ${p ? p.dogum : 'Bilinmiyor'}</p>
                <p><b>Biyografi:</b> ${p ? p.bio : 'Eklenmemiş.'}</p>
                <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
                <h4>Seslendirdiği Karakterler:</h4>
                <ul>
                    ${roller.map(r => `<li><b>${r.film}</b>: ${r.karakter}</li>`).join('')}
                </ul>
            </div>
        </div>`;
}
