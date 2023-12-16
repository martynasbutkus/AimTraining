const thememusic = document.getElementById("thememusic")
thememusic.volume = 0.1

document.addEventListener("DOMContentLoaded", function() {
    const musicCheckbox = document.getElementById("musicCheckbox");
    const thememusic = document.getElementById("thememusic");
    const musicPreference = localStorage.getItem("musicPreference");

    if (musicPreference === null || musicPreference === "true") {
        thememusic.play();
        musicCheckbox.checked = true;
    }
    musicCheckbox.addEventListener("change", function() {
        if (musicCheckbox.checked) {
            thememusic.play();
        } else {
            thememusic.pause();
        }
        localStorage.setItem("musicPreference", musicCheckbox.checked);
    });
});