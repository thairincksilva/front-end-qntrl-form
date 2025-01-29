import { createRouter, createWebHistory } from "vue-router";
import MultiStepForm from "../views/MultiStepForm.vue";

const routes = [
  { path: "/", name: "Form", component: MultiStepForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;