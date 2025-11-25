const TMDB_KEY = "BURAYA_OWN_API_KEY"; // <-- Buraya kendi TMDB API anahtarını yerleştir
let dubbingData = [];

fetch("data/dubbing_data.json")
    .then(res => res.json())
    .then(data => dubbingData = data.voiceActors);

async function search() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (query.length < 2) {
        resultsDiv.innerHTML = "<p>Lütfen daha fazla karakter yazın.</p>";
        return;
    }

    // 1) Seslendirmen eşleşmesi
    const va = dubbingData.find(v => v.name.toLowerCase() === query.toLowerCase());
    if (va) {
        showVoiceActor(va);
        return;
    }

    // 2) Film araması (TMDb)
    const movie = await searchMovie(query);
    if (movie) {
        showMovie(movie);
        return;
    }

    resultsDiv.innerHTML = "<p>Sonuç bulunamadı.</p>";
}

function showVoiceActor(actor) {
    const resultsDiv = document.getElementById("results");

    let rolesHTML = actor.roles.map(r =>
        `<li>${r.film} → <b>${r.character}</b> (${r.language === "tr" ? "Türkçe" : "İngilizce"})</li>`
    ).join("");

    resultsDiv.innerHTML = `
        <div class="card">
            <img src="${actor.photo}" class="poster" />
            <h2>${actor.name}</h2>
            <h3>Seslendirdiği roller:</h3>
            <ul>${rolesHTML}</ul>
        </div>
    `;
}

async function searchMovie(movieName) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(movieName)}&language=tr-TR`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0] || null;
}

function showMovie(movie) {
    const resultsDiv = document.getElementById("results");

    const filmTitle = movie.title;
    const poster = movie.poster_path ? 
        `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 
        "https://via.placeholder.com/120x180";

    // Dublaj bilgilerini filtrele
    const english = dubbingData.filter(x =>
        x.roles.some(r => r.film === filmTitle && r.language === "en")
    );

    const turkish = dubbingData.filter(x =>
        x.roles.some(r => r.film === filmTitle && r.language === "tr")
    );

    resultsDiv.innerHTML = `
        <div class="card">
            <img src="${poster}" class="poster" />
            <h2>${filmTitle}</h2>

            <h3>İngilizce Seslendirme</h3>
            ${english.length ? english.map(x => `<p>${x.name}</p>`).join("") : "<p>Bulunamadı</p>"}

            <h3>Türkçe Seslendirme</h3>
            ${turkish.length ? turkish.map(x => `<p>${x.name}</p>`).join("") : "<p>Bulunamadı</p>"}
        </div>
    `;
}
