const thememusic = document.getElementById("thememusic")
thememusic.volume = 0.1
const shot = document.getElementById("shot")
shot.volume = 0.2
const shotmiss = document.getElementById("shotmiss")
shotmiss.volume = 0.1

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
class AimTraining {
    constructor() {
        this.tabs = document.getElementsByClassName("tab");
        this.buttonsContainer = document.querySelector(".menu");
        this.buttons = document.querySelectorAll("a");
        this.score = 0;
        this.timer = 5;
        this.dot;
        this.gameInterval;
        this.buttonsContainer.style.display = "flex";
        this.highestScore = localStorage.getItem("highestScore") || 0;
        this.buttons.forEach((button, index) => {
            button.addEventListener("click", (event) => {
                const tabId = this.tabs[index].id;
                this.changeTab(tabId, event);
            });
        });
    }
    changeTab(id, event) {
        for (const tab of this.tabs) {
            tab.style.display = "none";
        }
        document.getElementById(id).style.display = "flex";
        this.buttonsContainer.style.display = "none";
        for (const button of this.buttons) {
            button.classList.remove("active");
        }
        event.currentTarget.classList.add("active");
    }

    updateScore() {
        document.getElementById("score").innerText = `Score: ${this.score}`;
    }

    updateTimer() {
        document.getElementById("timer").innerText = `Time: ${this.timer}s`;
    }

    updateHighestScore() {
        document.getElementById("highest").innerText = `Highest Score: ${this.highestScore}`;
    }

    saveHighestScore() {
        localStorage.setItem("highestScore", this.highestScore);
    }

    createDot() {
        this.dot = document.createElement("div");
        this.dot.className = "dot";
        const maxWidth = window.innerWidth - 20;
        const maxHeight = window.innerHeight - 20;
        this.dot.style.left = Math.random() * (maxWidth - 150) + "px";
        this.dot.style.top = Math.random() * (maxHeight - 150) + "px";
        this.dot.addEventListener("click", () => {
            const shot = document.getElementById("shot");
            this.dot.remove();
            this.score++;
            this.updateScore();
            setTimeout(() => this.createDot(), 1);
            shot.play();
        });
        const bodyClickHandler = (event) => {
            if (event.target !== this.dot) {
                const shotmiss = document.getElementById("shotmiss");
                shotmiss.play();
            }
        };
        document.body.addEventListener("click", bodyClickHandler);
        this.bodyClickHandler = bodyClickHandler;
        document.body.appendChild(this.dot);
    }

    hideDots() {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot) => {
            dot.style.display = "none";
        });
    }

    stopGame() {
        clearInterval(this.gameInterval);
        this.hideDots();
        this.buttonsContainer.style.display = "flex";
        this.dot = null;
        document.body.removeEventListener("click", this.bodyClickHandler);

        if (this.score > this.highestScore) {
            this.highestScore = this.score;
            this.updateHighestScore();
            this.saveHighestScore();
        }
    }

    startGame() {
        this.gameInterval = setInterval(() => {
            if (this.timer > 0) {
                if (!this.dot) {
                    this.createDot();
                }
                this.timer--;
                this.updateTimer();
            } else {
                this.stopGame();
            }
        }, 1000);
    }

    initialize() {
        this.timer = 30;
        this.score = 0;
        this.updateScore();
        this.updateTimer();
        this.updateHighestScore();
        document.querySelector(".menu").style.display = "none";
        this.startGame();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const aimTraining = new AimTraining();

    document.getElementById("aim").addEventListener("click", () => aimTraining.initialize());
});
