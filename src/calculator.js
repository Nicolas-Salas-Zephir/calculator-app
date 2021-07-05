import { dataGet } from "./utils";
import Chart from "./chart";

export default class Caluculator {
  constructor(el) {
    this.DOM = {
      el: el
    };

    this.total = "";
    this.variation = document.getElementById("variation");
    this.modal = document.getElementById("modal");
    this.DOM.groupForm = this.DOM.el.querySelector(".form");
    this.DOM.elP = this.DOM.el.querySelector("#modal>p");
    this.links = [...document.querySelectorAll(".navigation ul .v__link")];
    this.btns = [...this.DOM.el.querySelectorAll(".btn")];

    this.chart = new Chart();
    this.chart.getChart();
    this.evtClickCloseModal(this.DOM.el, ".close");
    this.evtClickCloseModal(document, "#navigationOpen");
    this.targetLink();
    this.evtClick();
  }

  evtClick() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.getValue(btn);
        this.showModal();
      });
    });
  }

  updateConfigBenef() {
    this.chart.getChart().config.data.labels.splice(0, 1, "bénéfice");
    this.chart.getChart().config.data.labels.splice(1, 1, "total");
    this.chart.getChart().config.data.labels.splice(1, 0, "coéquipier");
    this.chart
      .getChart()
      .config.data.datasets[0].backgroundColor.push("#9c27b0");
    this.chart.getChart().config.data.datasets[0].label = "bénéfice";
    return this.chart.getChart().update();
  }
  updateConfigVar() {
    this.chart.getChart().config.data.labels.splice(0, 1, "année -1");
    this.chart.getChart().config.data.labels.splice(1, 2, "année en cours");
    this.chart
      .getChart()
      .config.data.datasets[0].backgroundColor.splice(0, 3, "#009688");
    this.chart
      .getChart()
      .config.data.datasets[0].backgroundColor.push("#rgb(54, 162, 235)");
    this.chart.getChart().config.data.datasets[0].label = "salaire";
    return this.chart.getChart().update();
  }

  getValue(target) {
    const valueInput1 = document.querySelector(`#${dataGet(target)} .input1`);
    const valueInput2 = document.querySelector(`#${dataGet(target)} .input2`);
    const value1 = valueInput1.value;
    const value2 = valueInput2.value;

    if (dataGet(target) === "variation") {
      this.chart.getChart().config.data.datasets[0].data.push(value1, value2);
      this.calcVariation(value1, value2);
      this.updateInput(dataGet(target));
      this.chart.getChart().update();
    } else if (dataGet(target) === "percentSalary") {
      this.calcBenefit(value1, value2);
      this.updateInput(dataGet(target));
      this.chart.getChart().update();
    }
  }

  calcVariation(input1, input2) {
    const calc = ((input2 - input1) / input1) * 100;
    this.total = Math.floor(calc);
    this.createTextVariation(calc);
  }

  calcBenefit(input1, input2) {
    const calc = (input2 * input1) / 100;
    const coop = Math.floor(input2 - calc);
    this.total = Math.floor(calc);
    this.chart.getChart().config.data.datasets[0].data.push(calc, coop, input2);
    this.createTextSalary(coop, input2);
  }

  updateInput(target) {
    const valueInput1 = this.DOM.el.querySelector(`#${target} .input1`);
    const valueInput2 = this.DOM.el.querySelector(`#${target} .input2`);
    const value1 = (valueInput1.value = "");
    const value2 = (valueInput2.value = "");
  }

  createTextVariation(calc) {
    if (calc > 0) {
      this.DOM.elP.innerHTML = `<span style="font-size: 20px;position: absolute;top: 50%;left: 45%;transform: translate(-50%, -50%); display: block">+${this.total}%</span>`;
    } else if (calc < 0) {
      this.DOM.elP.innerHTML = `<span style="font-size: 20px;position: absolute;top: 50%;left: 45%;transform: translate(-50%, -50%); display: block">${this.total}%</span>`;
    }
    return this.DOM.elP;
  }

  createTextSalary(coop, total) {
    this.DOM.elP.innerHTML = `<p><span style="color:#6c6c6c">Mon salaire :</span> <span>${this.total}€</span></p>
    <p><span style="color:#6c6c6c">Coéquipier :</span> <span>${coop}€</span></p>
    <p><span style="color:#6c6c6c">Total :</span> <span>${total}€</span></p>`;
    return this.DOM.elP;
  }

  showModal() {
    this.modal.style.pointerEvents = "auto";
    this.DOM.el.style.pointerEvents = "none";
    this.DOM.groupForm.style.opacity = 0;
    this.DOM.groupForm.ariaHidden = "true";

    setTimeout(() => {
      this.modal.style.opacity = 1;
      this.modal.ariaHidden = "false";
    }, 500);
  }

  evtClickCloseModal(dom, name) {
    dom.querySelector(name).addEventListener("click", () => {
      this.closeModal();
    });
  }

  closeModal() {
    const lengthChartData = this.chart.getChart().config.data.datasets[0].data
      .length;
    const canvasChart = document.querySelector(".chart");
    this.DOM.el.style.pointerEvents = "auto";
    this.modal.style.pointerEvents = "none";
    this.modal.style.opacity = 0;
    this.modal.ariaHidden = "true";
    canvasChart.style.opacity = 0;
    setTimeout(() => {
      this.chart
        .getChart()
        .config.data.datasets[0].data.splice(0, lengthChartData);
    }, 400);
    setTimeout(() => {
      this.chart.getChart().update();
      canvasChart.style.opacity = 1;
    }, 500);

    setTimeout(() => {
      this.DOM.groupForm.style.opacity = 1;
      this.DOM.groupForm.ariaHidden = "false";
    }, 500);
  }

  targetLink() {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = dataGet(e.target);
        const targetForm = document.getElementById(`${target}`);
        this.activeFormModal(targetForm);
        if (target === "percentSalary") {
          this.updateConfigBenef();
        } else if (target === "variation") {
          this.updateConfigVar();
        }
      });
    });
  }

  activeFormModal(target) {
    const current = document
      .querySelector(".wrap__form")
      .getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    return (target.className += " active");
  }
}
