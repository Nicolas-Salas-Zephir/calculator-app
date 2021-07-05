import Calculator from "./calculator";
import Load from "./load";
import Navigation from "./navigation";
import Background from "./background";

class Index {
  constructor() {
    this.container = document.querySelector(".container");
    this.main = document.querySelector("main");
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.cover = document.querySelector(".screen__cover");
    setTimeout(() => {
      document.body.style.opacity = 1;
    }, 1500);

    this.resizeScreen();
  }

  resizeScreen() {
    if (this.sizes.width <= 425) {
      this.init();
      this.evtResize();
      this.container.style.height = `${this.sizes.height}px`;
      this.main.style.height = `${this.sizes.height - 129}px`;
    } else if (this.sizes.width >= 425) {
      this.animCoverShow();
      this.evtResize();
    }
  }

  evtResize() {
    window.addEventListener("resize", () => {
      this.updateSizes();
      if (this.sizes.width <= 425) {
        this.init();
        this.animCoverHidden();
        this.container.style.height = `${this.sizes.height}px`;
        this.main.style.height = `${this.sizes.height - 129}px`;
      } else if (this.sizes.width >= 425) {
        this.animCoverShow();
      }
    });
  }

  init() {
    try {
      const calculator = new Calculator(document.querySelector(".container"));
      const background = new Background(document.querySelector(".navigation"));
      const load = new Load(document.querySelector(".load"));
      const navigation = new Navigation(
        document.getElementById("navigationClose"),
        document.getElementById("navigationOpen")
      );
    } catch (err) {
      console.error(err.mesage);
    }
  }

  animCoverShow() {
    this.cover.style.visibility = "inherit";
    setTimeout(() => {
      this.cover.style.display = "block";
    }, 200);
    setTimeout(() => {
      this.cover.style.opacity = 1;
    }, 300);
  }

  animCoverHidden() {
    this.cover.style.opacity = 0;
    setTimeout(() => {
      this.cover.style.visibility = "hidden";
    }, 1000);
    setTimeout(() => {
      this.cover.style.display = "none";
    }, 1000);
  }

  updateSizes() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
  }
}

const index = new Index();
