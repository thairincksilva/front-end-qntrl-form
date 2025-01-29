<template>
  <MultiStepForm />
</template>

<script>
import { markRaw } from 'vue'
import MultiStepForm from "./views/MultiStepForm.vue"

export default {
  components: {
    MultiStepForm: markRaw(MultiStepForm)
  }
}
</script>

<style>
</style>
