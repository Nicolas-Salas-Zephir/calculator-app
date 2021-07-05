export default class Navigation {
  constructor(elClose, elOpen) {
    this.DOM = {
      elClose: elClose,
      elOpen: elOpen
    };
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.target = 0;
    this.container = document.querySelector(".container");
    this.variation = document.getElementById("variation");
    this.headerEl = document.querySelector("header");
    this.navigation = document.querySelector(".navigation");
    this.cover = this.navigation.querySelector(".cover__nav");
    this.links = [...this.navigation.querySelectorAll(".v__link")];
    this.mainEl = document.querySelector("main");
    this.cross = this.DOM.elClose.querySelector(".cross");
    this.ulEl = document.querySelector(".navigation ul");
    this.coverContainer = document.querySelector(".cover__container");
    this.text = this.DOM.elClose.querySelector("span:nth-child(2)");

    this.targetUpdate();
    this.evtclickShow();
    this.evtclickClose();
    this.evtMouse("mouseenter");
    this.evtMouse("mouseleave");
  }

  evtclickShow() {
    this.DOM.elOpen.addEventListener("click", () => {
      this.showNav();
    });
  }

  evtclickClose() {
    this.DOM.elClose.addEventListener("click", () => {
      this.closeNav();
    });
  }

  showNav() {
    this.navigation.style.opacity = 1;
    this.navigation.ariaHidden = "false";
    this.container.ariaHidden = "true";
    this.container.style.borderRadius = "30px 0 0 30px";
    this.headerEl.style.borderRadius = "30px 0 0 0";
    this.mainEl.style.pointerEvents = "none";
    this.variation.style.pointerEvents = "none";
    this.DOM.elOpen.style.pointerEvents = "none";
    this.DOM.elClose.style.pointerEvents = "all";
    this.DOM.elClose.style.opacity = 1;
    this.ulEl.style.opacity = 1;
    this.coverContainer.style.opacity = 1;
    if (this.size.width > 525) {
      this.container.style.transform = "translateX(20%) scale(0.8)";
    } else if (this.size.width < 525) {
      this.container.style.transform = "translateX(70%) scale(0.8)";
    }
  }

  closeNav() {
    this.navigation.ariaHidden = "true";
    this.container.ariaHidden = "false";
    this.container.style.borderRadius = "0 0 0 0";
    this.headerEl.style.borderRadius = "0 0 0 0";
    this.mainEl.style.pointerEvents = "all";
    this.variation.style.pointerEvents = "all";
    this.DOM.elOpen.style.pointerEvents = "all";
    this.DOM.elClose.style.pointerEvents = "none";
    this.DOM.elClose.style.opacity = 0;
    this.ulEl.style.opacity = 0;
    this.coverContainer.style.opacity = 0;
    if (this.size.width > 525) {
      this.container.style.transform = "translateX(0) scale(1)";
    } else if (this.size.width < 525) {
      this.container.style.transform = "translateX(0) scale(1)";
    }
  }

  targetUpdate() {
    this.links.forEach((link, index) => {
      link.addEventListener("click", () => {
        this.target = index;
      });
    });
  }

  evtMouse(evt) {
    this.links.forEach((link, index) => {
      link.addEventListener(evt, () => {
        if (evt === "mouseenter") {
          this.cover.style.transform = `translate(-15px ,calc((100%) * ${index}))`;
        } else if (evt === "mouseleave") {
          this.cover.style.transform = `translate(-15px ,calc((100%) * ${this.target}))`;
        }
      });
    });
  }
}
