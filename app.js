  const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

let dublajVerileri = [];

// Sayfa yüklendiğinde verileri çek
async function verileriGetir() {
    try {
        const response = await fetch('data.json');
        dublajVerileri = await response.json();
        listele(dublajVerileri); // İlk başta hepsini göster
    } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
        resultsContainer.innerHTML = "<p>Veriler yüklenemedi.</p>";
    }
}

// Verileri Ekrana Basma Fonksiyonu
function listele(veriler) {
    resultsContainer.innerHTML = ''; // Önce temizle

    if (veriler.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align:center; width:100%;">Sonuç bulunamadı.</p>';
        return;
    }

    veriler.forEach(item => {
        // Kart HTML yapısı
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.sanatciFoto}" alt="${item.sanatciIsmi}">
            <h3>${item.sanatciIsmi}</h3>
            <div class="role-info">
                <strong>Film/Dizi:</strong> ${item.filmIsmi} <br>
                <strong>Karakter:</strong> <span class="character">${item.karakter}</span>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

// Arama Mantığı
searchInput.addEventListener('input', (e) => {
    const arananKelime = e.target.value.toLowerCase();

    const filtrelenmisVeriler = dublajVerileri.filter(item => {
        // Sanatçı ismi, Film ismi veya Karakter isminde arama yapar
        return (
            item.sanatciIsmi.toLowerCase().includes(arananKelime) ||
            item.filmIsmi.toLowerCase().includes(arananKelime) ||
            item.karakter.toLowerCase().includes(arananKelime)
        );
    });

    listele(filtrelenmisVeriler);
});

// Uygulamayı başlat
verileriGetir();
