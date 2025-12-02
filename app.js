const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const noResultMsg = document.getElementById('no-result-msg');
const radioButtons = document.getElementsByName('searchType');

let allData = [];

// Sayfa yüklendiğinde veriyi çek
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./data.json');
        allData = await response.json();
        // İsterseniz açılışta hepsini gösterebilirsiniz:
        // displayResults(allData); 
    } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
        resultsContainer.innerHTML = "<p>Veri yüklenemedi.</p>";
    }
});

// Arama kutusuna yazıldıkça çalışır
searchInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const searchType = getSearchType();
    
    if (searchString.length < 2) {
        resultsContainer.innerHTML = ''; // 2 harften azsa temizle
        noResultMsg.style.display = 'none';
        return;
    }

    const filteredData = filterData(searchString, searchType);
    displayResults(filteredData, searchString);
});

// Hangi radyo butonunun seçili olduğunu bulur
function getSearchType() {
    for (const radio of radioButtons) {
        if (radio.checked) return radio.value;
    }
    return 'all';
}

// Filtreleme Mantığı
function filterData(query, type) {
    return allData.filter(actor => {
        const actorName = actor.name.toLowerCase();
        
        // Sanatçı isminde arama
        const nameMatch = actorName.includes(query);
        
        // Filmlerde arama (Eşleşen filmleri bulmak için)
        const workMatch = actor.works.some(work => 
            work.movie.toLowerCase().includes(query)
        );

        if (type === 'actor') return nameMatch;
        if (type === 'movie') return workMatch;
        return nameMatch || workMatch; // 'all' ise ikisine de bak
    });
}

// Ekrana Bastırma Mantığı
function displayResults(actors, query) {
    resultsContainer.innerHTML = '';
    
    if (actors.length === 0) {
        noResultMsg.style.display = 'block';
        return;
    } else {
        noResultMsg.style.display = 'none';
    }

    actors.forEach(actor => {
        // Film araması yapıyorsak, sadece o filmle ilgili rolleri öne çıkarabiliriz
        // Ancak basitlik adına sanatçının tüm listesini veya filtrelenmiş listesini gösterelim.
        
        // Kart Oluşturma
        const card = document.createElement('div');
        card.classList.add('card');

        let worksHtml = '';
        actor.works.forEach(work => {
            // Eğer film araması yapıldıysa, sadece aranan filmi vurgula veya göster
            // Basitlik için hepsini listeliyoruz:
            worksHtml += `
                <li class="role-item">
                    <span class="role-movie">${work.movie}</span>
                    <span class="role-char">${work.character}</span>
                </li>
            `;
        });

        card.innerHTML = `
            <img src="${actor.photo}" alt="${actor.name}" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title">${actor.name}</h3>
                <ul class="role-list">
                    ${worksHtml}
                </ul>
            </div>
        `;
        
        resultsContainer.appendChild(card);
    });
}
