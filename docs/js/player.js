document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sound-player')) {
        // NOTA: Crie a pasta 'docs/audio/' e adicione os sons.
        const sounds = [
            { name: "Floresta", file: "audio/forest.mp3" },
            { name: "Chuva", file: "audio/rain.mp3" },
            { name: "Ondas", file: "audio/waves.mp3" }
        ];

        const soundButtonsContainer = document.getElementById('sound-buttons');
        const audioPlayer = document.getElementById('audio-player');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const currentSound = document.getElementById('current-sound');

        sounds.forEach(sound => {
            const button = document.createElement('button');
            button.innerText = sound.name;
            button.classList.add('btn', 'btn-outline-secondary', 'mx-2');
            button.addEventListener('click', () => {
                if (audioPlayer.src.includes(sound.file) && !audioPlayer.paused) {
                    audioPlayer.pause();
                    playPauseBtn.innerText = "Play";
                } else {
                    audioPlayer.src = sound.file;
                    currentSound.innerText = `Tocando: ${sound.name}`;
                    audioPlayer.play();
                    playPauseBtn.innerText = "Pause";
                }
            });
            soundButtonsContainer.appendChild(button);
        });

        playPauseBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                if (audioPlayer.src) {
                    audioPlayer.play();
                    playPauseBtn.innerText = "Pause";
                }
            } else {
                audioPlayer.pause();
                playPauseBtn.innerText = "Play";
            }
        });

        volumeSlider.addEventListener('input', () => {
            audioPlayer.volume = volumeSlider.value;
        });
    }
});