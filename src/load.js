export default class Load {
  constructor(el) {
    this.DOM = {
      el: el
    };

    this.DOM.letters = [
      ...this.DOM.el.querySelectorAll(".load__letter>span>span")
    ];
    this.container = document.querySelector(".container");
    this.variation = document.getElementById("variation");
    this.header = document.querySelector("header");
    this.main = document.querySelector("main");
    this.title = document.querySelector(".title h1");

    this.variation.style.pointerEvents = "none";
    this.header.style.pointerEvents = "none";

    setTimeout(() => {
      this.startLetterLoad();
    }, 1300);
  }

  startLetterLoad() {
    this.DOM.letters.forEach((letter) => {
      letter.style.transform = "translateX(0%)";
      setTimeout(() => {
        letter.style.transform = "translateX(-105%)";
        document.body.style.background = "#EFF4FB";
        this.variation.style.pointerEvents = "auto";
        this.header.style.pointerEvents = "auto";
      }, 2000);
    });
    this.hiddenLoad();
  }

  hiddenLoad() {
    setTimeout(() => {
      this.DOM.el.style.opacity = 0;
    }, 2000 + 1300);
    setTimeout(() => {
      this.DOM.el.style.display = "none";
    }, 2000 + 1300 * 2);
    setTimeout(() => {
      this.container.style.opacity = "1";
      this.title.style.transform = "translate3d(0,0,0) rotate(0deg)";
    }, 2000 + 1300 * 2);
    setTimeout(() => {
      this.main.style.opacity = "1";
    }, 2000 + 1300 * 2.7);
  }
}
