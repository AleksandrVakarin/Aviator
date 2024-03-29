'use strict';
const videoPlayer = document.getElementById('videoPlayer');
const progressBar = document.getElementById('progressBar');
const progressBarFilled = document.getElementById('progressBarFilled');


function updateProgressBar() {
    let percentage;
    if (videoPlayer.currentTime < videoPlayer.duration / 6) {
        // Ускорение в 3 раза до середины
        percentage = (videoPlayer.currentTime / (videoPlayer.duration / 2)) * 50;
        percentage *= 3; // Повышаем скорость в 3 раза
        if (percentage > 100) percentage = 100; // Ограничиваем максимальное значение 100%
    } else {
        // Замедление без плавного перехода обратно
        let slowDownFactor = 3; // Фактор замедления

        let timeInSecondHalf = videoPlayer.currentTime - (videoPlayer.duration / 6); // Время с начала второй половины
        let timeRemaining = videoPlayer.duration / 2 - timeInSecondHalf; // Оставшееся время второй половины
        let progressInSecondHalf = ((videoPlayer.duration / 2 - timeRemaining) / (videoPlayer.duration / 2)) * 90; // Прогресс во второй половине

        percentage = 50 + (progressInSecondHalf / slowDownFactor); // Плавное замедление во второй половине

        if (percentage > 100) percentage = 100; // Ограничиваем максимальное значение 100%
    }
    progressBarFilled.style.width = percentage + "%";
}

const seek = (e) => {
    const percent = e.offsetX / progressBar.offsetWidth;
    videoPlayer.currentTime = percent * videoPlayer.duration;
}

videoPlayer.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', seek);


const playButton = document.getElementById('playButton');

// Функция для обновления состояния кнопки
function togglePlay() {
    if (videoPlayer.paused || videoPlayer.ended) {
        playButton.innerHTML = "&#10074;&#10074;"; // Символы паузы
        videoPlayer.play();
    } else {
        playButton.innerHTML = "&#x25BA;"; // Символ воспроизведения
        videoPlayer.pause();
    }
}

// Слушатель события для кнопки воспроизведения/паузы
playButton.addEventListener('click', togglePlay);

// Обновление состояния кнопки при запуске видео и остановке видео
videoPlayer.addEventListener('play', () => {
    playButton.innerHTML = "&#10074;&#10074;"; // Символы паузы
});

videoPlayer.addEventListener('pause', () => {
    playButton.innerHTML = "&#x25BA;"; // Символ воспроизведения
});

// Скрыть стандартные контролы видео, если они все еще отображаются
videoPlayer.controls = false;