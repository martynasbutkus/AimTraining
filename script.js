let vid = document.querySelector("audio")
vid.volume = 0.1

class AimTraining {
    constructor() {
        this.tabs = document.getElementsByClassName("tab");
        this.buttonsContainer = document.querySelector(".menu");
        this.buttons = document.querySelectorAll("button");
        this.score = 0;
        this.timer = 5;
        this.dot;
        this.gameInterval;
        this.buttonsContainer.style.display = "flex";
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
    createDot() {
        this.dot = document.createElement("div");
        this.dot.className = "dot";
        const maxWidth = window.innerWidth - 20;
        const maxHeight = window.innerHeight - 20;
        this.dot.style.left = Math.random() * maxWidth + "px";
        this.dot.style.top = Math.random() * maxHeight + "px";
        this.dot.addEventListener("click", () => {
            this.dot.remove();
            this.score++;
            this.updateScore();
            setTimeout(() => this.createDot(), 1);
        });
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
        this.timer = 5;
        this.score = 0;
        this.updateScore();
        this.updateTimer();
        document.querySelector(".menu").style.display = "none";
        this.startGame();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const aimTraining = new AimTraining();

    document.getElementById("aim").addEventListener("click", () => aimTraining.initialize());
});
