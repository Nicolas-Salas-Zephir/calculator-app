export default class background {
  constructor(el) {
    this.DOM = {
      el: el
    };
    this.btnColor = document.querySelectorAll(".color");
    this.evtClick();
  }

  evtClick() {
    this.btnColor.forEach((color) => {
      color.addEventListener("click", (e) => {
        const target = e.target.dataset.color;
        const targetColor = document.querySelector(`.color-${target}`);
        const targetBg = document.querySelector(`.navigation__bg-${target}`);
        this.activeColor(targetColor);
        this.getBg(targetBg);
      });
    });
  }

  activeColor(target) {
    const current = this.DOM.el.getElementsByClassName("color-border");
    current[0].className = current[0].className.replace(" color-border", "");
    return (target.className += " color-border");
  }

  getBg(target) {
    const current = this.DOM.el.getElementsByClassName("navigation__bg-active");
    current[0].className = current[0].className.replace(
      " navigation__bg-active",
      ""
    );
    return (target.className += " navigation__bg-active");
  }
}
