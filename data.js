// 🔍 Arama Kutusu Fonksiyonu
function performSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsArea = document.getElementById("resultsArea");

    if (!query) {
        resultsArea.innerHTML = "<p>Lütfen arama yapın.</p>";
        return;
    }

    resultsArea.innerHTML = "";

    // Film arama
    const movieResults = database.movies.filter(m =>
        m.title.toLowerCase().includes(query)
    );

    // Seslendirme sanatçısı arama
    const actorResults = database.voiceActors.filter(a =>
        a.name.toLowerCase().includes(query)
    );

    // Eğer sonuç yoksa
    if (movieResults.length === 0 && actorResults.length === 0) {
        resultsArea.innerHTML = "<p>Sonuç bulunamadı.</p>";
        return;
    }

    // 🎬 Filmleri listele
    movieResults.forEach(movie => {
        const item = document.createElement("div");
        item.className = "grid-item";
        item.onclick = () => showMovieDetail(movie.id);

        item.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
        `;

        resultsArea.appendChild(item);
    });

    // 🎤 Seslendirme sanatçılarını listele
    actorResults.forEach(actor => {
        const item = document.createElement("div");
        item.className = "grid-item";
        item.onclick = () => showActorDetail(actor.id);

        item.innerHTML = `
            <img src="${actor.img}" alt="${actor.name}">
            <h3>${actor.name}</h3>
            <p>Seslendirme Sanatçısı</p>
        `;

        resultsArea.appendChild(item);
    });
}

// 🎬 Film Detay Sayfası
function showMovieDetail(movieId) {
    const movie = database.movies.find(m => m.id === movieId);

    document.getElementById("resultsArea").classList.add("hidden");
    document.getElementById("actorDetailArea").classList.add("hidden");

    const area = document.getElementById("movieDetailArea");
    area.classList.remove("hidden");

    document.getElementById("movieInfo").innerHTML = `
        <img src="${movie.poster}">
        <div>
            <h2>${movie.title}</h2>
            <p>${movie.year}</p>
        </div>
    `;

    const castList = document.getElementById("castList");
    castList.innerHTML = "";

    movie.cast.forEach(c => {
        const trVoice = database.voiceActors.find(v => v.id === c.tr_actor_id);

        castList.innerHTML += `
            <div class="cast-row">
                <span>${c.original}</span>
                <span>${c.character}</span>
                <span class="tr-voice" onclick="showActorDetail(${trVoice.id})">
                    ${trVoice.name}
                </span>
            </div>
        `;
    });
}

// 🎤 Seslendirme Sanatçısı Detay Sayfası
function showActorDetail(actorId) {
    const actor = database.voiceActors.find(a => a.id === actorId);

    document.getElementById("resultsArea").classList.add("hidden");
    document.getElementById("movieDetailArea").classList.add("hidden");

    const area = document.getElementById("actorDetailArea");
    area.classList.remove("hidden");

    document.getElementById("actorInfo").innerHTML = `
        <img src="${actor.img}">
        <h2>${actor.name}</h2>
    `;

    const credits = document.getElementById("actorCredits");
    credits.innerHTML = "";

    // Bu sanatçının seslendirdiği filmleri bul
    const films = database.movies.filter(movie =>
        movie.cast.some(c => c.tr_actor_id === actorId)
    );

    films.forEach(movie => {
        const item = document.createElement("div");
        item.className = "grid-item";
        item.onclick = () => showMovieDetail(movie.id);

        item.innerHTML = `
            <img src="${movie.poster}">
            <h3>${movie.title}</h3>
        `;

        credits.appendChild(item);
    });
}

// 🔙 Geri Dön
function goBack() {
    document.getElementById("movieDetailArea").classList.add("hidden");
    document.getElementById("actorDetailArea").classList.add("hidden");

    document.getElementById("resultsArea").classList.remove("hidden");
}
