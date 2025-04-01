const data = [
    {
        titre: "Baltrou pt1",
        partie: "partie_1_robin",
        lien_audio: "medias/audio/partie_1_robin.mp3",
        artiste: "Robin"
    },
    {
        titre: "Baltrou pt2",
        partie: "partie_2_clement",
        lien_audio: "medias/audio/partie_2_clement.mp3",
        artiste: "Clément"
    },
    {
        titre: "Baltrou pt69",
        partie: "partie_69_robin",
        lien_audio: "medias/audio/partie_69_robin.mp3",
        artiste: "Robin"
    },
    {
        titre: "Baltrou pt78",
        partie: "partie_78_robin",
        lien_audio: "medias/audio/partie_78_robin.mp3",
        artiste: "Robin"
    },
    {
        titre: "Baltrou pt98",
        partie: "partie_98_matthias",
        lien_audio: "medias/audio/partie_98_matthias.mp3",
        artiste: "Matthias"
    },
    {
        titre: "La Clique",
        partie: "la_clique",
        lien_audio: "medias/audio/la_clique_robin.mp3",
        artiste: "Robin"
    },
    {
        titre: "La Malice",
        partie: "la_malice",
        lien_audio: "medias/audio/la_malice_robin.mp3",
        artiste: "Robin"
    },
    {
        titre: "Funky Baltrou",
        partie: "suno_baltrou",
        lien_audio: "medias/audio/suno_baltrou.mp3",
        artiste: "Robin"
    },
  ];

// Sélectionne le container pour les cards
const container = document.getElementById('content');

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Image de couverture
    const img = document.createElement('img');
    img.src = "medias/cover.jpg";
    img.alt = "Image album";
    card.appendChild(img);
    
    const titre = document.createElement('h3');
    titre.textContent = item.titre;
    card.appendChild(titre);
    
    const artiste = document.createElement('p');
    artiste.textContent = item.artiste;
    card.appendChild(artiste);
    
    // Élément audio personnalisé
    const audio = document.createElement('audio');
    audio.src = item.lien_audio;
    audio.preload = 'auto'; // Assure le chargement des métadonnées
    card.appendChild(audio);
    
    // Interface customisée
    const player = document.createElement('div');
    player.classList.add('audio-player');
    
    // Bouton play/pause
    const playBtn = document.createElement('button');
    playBtn.classList.add('play-button');
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
    player.appendChild(playBtn);
    
    // Barre de progression
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress-container');
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progressContainer.appendChild(progress);
    player.appendChild(progressContainer);
    
    // Slider de volume
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.classList.add('volume-slider');
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.01;
    volumeSlider.value = 1;
    player.appendChild(volumeSlider);
    
    card.appendChild(player);
    
    // Gestion des interactions
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                // L'événement 'play' se déclenchera et mettra à jour l'icône
            }).catch(err => console.error('Erreur lors de la lecture : ', err));
        } else {
            audio.pause();
        }
    });
    
    audio.addEventListener('play', () => {
         playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    });
    
    audio.addEventListener('pause', () => {
         playBtn.innerHTML = '<i class="fa fa-play"></i>';
    });
    
    audio.addEventListener('ended', () => {
         playBtn.innerHTML = '<i class="fa fa-play"></i>';
         progress.style.width = '0%';
    });
    
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percent + '%';
        }
    });
    
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });
    
    return card;
}



document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('content');
    data.forEach(item => {
        const card = createCard(item);
        container.appendChild(card);
    });
});

