import Chart from "chart.js/auto";

export default class Charts {
  constructor() {
    this.instance = null;
    this.values = [];
    this.type = "bar";
    this.datas = {
      labels: ["année -1", "en cours"],
      datasets: [
        {
          label: "salaire",
          backgroundColor: ["#009688", "rgb(54, 162, 235)"]
        }
      ]
    };
    this.animations = {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: false
        }
      }
    };
    this.plugins = {
      plugins: {
        title: {
          display: true,
          text: "Custom Chart Title"
        }
      }
    };
    this.config = {
      type: this.type,
      data: this.datas,
      options: this.animations,
      plugins: this.plugins
    };
    this.ctx = document.getElementById("myChart");
  }

  getChart() {
    if (this.instance === null) {
      this.instance = new Chart(this.ctx, this.config);
    }
    return this.instance;
  }
}
