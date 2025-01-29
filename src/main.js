import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

// Importa as diretivas de máscara
import { maskDirective } from "./directives/mask.js";

const app = createApp(App);

// Registra a diretiva globalmente
app.directive("mask", maskDirective);

app.use(router).mount("#app");
