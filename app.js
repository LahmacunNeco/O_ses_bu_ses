const searchInput = document.getElementById('searchInput');
const resultsArea = document.getElementById('resultsArea');
const movieDetailArea = document.getElementById('movieDetailArea');
const actorDetailArea = document.getElementById('actorDetailArea');

// Enter tuşuna basınca arama yapması için
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    // Ekranı temizle ve sonuç alanını göster
    hideDetails();
    resultsArea.innerHTML = '';
    
    // 1. Filmleri Ara
    const foundMovies = database.movies.filter(movie => 
        movie.title.toLowerCase().includes(query)
    );

    // 2. Seslendirme Sanatçılarını Ara
    const foundActors = database.voiceActors.filter(actor => 
        actor.name.toLowerCase().includes(query)
    );

    // Sonuç Yoksa
    if (foundMovies.length === 0 && foundActors.length === 0) {
        resultsArea.innerHTML = '<p>Sonuç bulunamadı.</p>';
        return;
    }

    // Filmleri Listele
    foundMovies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="card-content">
                <span class="card-title">${movie.title}</span>
                <span class="card-sub">Film / Dizi (${movie.year})</span>
            </div>
        `;
        card.onclick = () => showMovieDetail(movie);
        resultsArea.appendChild(card);
    });

    // Sanatçıları Listele
    foundActors.forEach(actor => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${actor.img}" alt="${actor.name}">
            <div class="card-content">
                <span class="card-title">${actor.name}</span>
                <span class="card-sub">Seslendirme Sanatçısı</span>
            </div>
        `;
        card.onclick = () => showActorDetail(actor);
        resultsArea.appendChild(card);
    });
}

function showMovieDetail(movie) {
    resultsArea.classList.add('hidden');
    movieDetailArea.classList.remove('hidden');

    // Film Başlığı ve Posteri
    document.getElementById('movieInfo').innerHTML = `
        <img src="${movie.poster}" class="movie-poster">
        <div>
            <h2>${movie.title} (${movie.year})</h2>
            <p>Seslendirme Kadrosu</p>
        </div>
    `;

    // Kadro Listesi (İstediğin Sol-Orta-Sağ düzeni)
    const castListDiv = document.getElementById('castList');
    castListDiv.innerHTML = '';

    movie.cast.forEach(role => {
        // ID'den sanatçı ismini bul
        const trActor = database.voiceActors.find(a => a.id === role.tr_actor_id);
        const trName = trActor ? trActor.name : "Bilinmiyor";

        const row = document.createElement('div');
        row.className = 'cast-row';
        row.innerHTML = `
            <div class="cast-col">${role.original}</div>
            <div class="cast-col center">${role.character}</div>
            <div class="cast-col right">${trName} <i class="fas fa-microphone"></i></div>
        `;
        // İsim üzerine tıklanınca sanatçıya gitme özelliği
        if(trActor) {
            row.querySelector('.right').style.cursor = 'pointer';
            row.querySelector('.right').onclick = () => showActorDetail(trActor);
        }
        
        castListDiv.appendChild(row);
    });
}

function showActorDetail(actor) {
    resultsArea.classList.add('hidden');
    movieDetailArea.classList.add('hidden');
    actorDetailArea.classList.remove('hidden');

    // Sanatçı Bilgisi
    document.getElementById('actorInfo').innerHTML = `
        <img src="${actor.img}" class="actor-img-lg">
        <div>
            <h2>${actor.name}</h2>
            <p>Seslendirme Sanatçısı</p>
        </div>
    `;

    // Sanatçının Hangi Filmlerde Hangi Karakteri Seslendirdiği
    const creditsDiv = document.getElementById('actorCredits');
    creditsDiv.innerHTML = '';

    // Tüm filmleri tara, bu sanatçının olduğu rolleri bul
    database.movies.forEach(movie => {
        const role = movie.cast.find(c => c.tr_actor_id === actor.id);
        if (role) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="card-content">
                    <span class="card-title">${movie.title}</span>
                    <span class="card-sub">Karakter: <strong>${role.character}</strong></span>
                </div>
            `;
            // Buradan filme geri dönebilmek için:
            card.onclick = () => showMovieDetail(movie);
            creditsDiv.appendChild(card);
        }
    });
}

function goBack() {
    movieDetailArea.classList.add('hidden');
    actorDetailArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
}

function hideDetails() {
    movieDetailArea.classList.add('hidden');
    actorDetailArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
}
