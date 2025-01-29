<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Dados da Empresa</h2>
    <form @submit.prevent="handleNext">
      <!-- CNPJ -->
      <label class="block mb-2">
        CNPJ:
        <input
          v-mask="'XX.XXX.XXX/XXXX-XX'"
          type="text"
          v-model="localData.cnpj"
          class="w-full border p-2 rounded"
          required
          placeholder="Digite o CNPJ"
        />
      </label>

      <!-- Razão Social -->
      <label class="block mb-2">
        Razão Social:
        <input 
          type="text" 
          v-model="localData.razaoSocial" 
          class="w-full border p-2 rounded" 
          required 
          placeholder="Digite a razão social" 
        />
      </label>

      <!-- Nome Fantasia -->
      <label class="block mb-2">
        Nome Fantasia:
        <input 
          type="text" 
          v-model="localData.nomeFantasia" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o nome fantasia" 
        />
      </label>

      <!-- Email -->
      <label class="block mb-2">
        Email:
        <input 
          type="email" 
          v-model="localData.email" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o email" 
        />
      </label>

      <!-- Atividade Principal -->
      <label class="block mb-2">
        Atividade Principal:
        <input 
          type="text" 
          v-model="localData.atividadePrincipal" 
          class="w-full border p-2 rounded" 
          placeholder="Digite a atividade principal" 
        />
      </label>

      <!-- Telefone -->
      <label class="block mb-2">
        Telefone:
        <input 
          v-mask="'(XX) XXXXXXXXX'" 
          type="tel" 
          v-model="localData.telefone" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o telefone" 
        />
      </label>

      <!-- Data de Abertura -->
      <label class="block mb-2">
        Data de Abertura:
        <input 
          type="text" 
          ref="openingDatePicker" 
          v-model="localData.dataAbertura"
          class="w-full border p-2 rounded" 
          placeholder="Selecione a data" 
          required 
        />
      </label>

      <!-- CEP -->
      <label class="block mb-2">
        CEP:
        <input 
          v-mask="'XXXXX-XXX'" 
          type="text" 
          v-model="localData.cep" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o CEP" 
        />
      </label>

      <!-- Endereço -->
      <label class="block mb-2">
        Endereço:
        <input 
          type="text" 
          v-model="localData.endereco" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o endereço" 
        />
      </label>

      <!-- Número -->
      <label class="block mb-2">
        Número:
        <input 
          type="text" 
          v-model="localData.numero" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o número" 
        />
      </label>

      <!-- Complemento -->
      <label class="block mb-2">
        Complemento:
        <input 
          type="text" 
          v-model="localData.complemento" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o complemento" 
        />
      </label>

      <!-- Bairro -->
      <label class="block mb-2">
        Bairro:
        <input 
          type="text" 
          v-model="localData.bairro" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o bairro" 
        />
      </label>

      <!-- Cidade -->
      <label class="block mb-2">
        Cidade:
        <input 
          type="text" 
          v-model="localData.cidade" 
          class="w-full border p-2 rounded" 
          placeholder="Digite a cidade" 
        />
      </label>

      <!-- UF -->
      <label class="block mb-2">
        UF:
        <input 
          type="text" 
          v-model="localData.uf" 
          class="w-full border p-2 rounded" 
          placeholder="Digite a UF" 
        />
      </label>

      <!-- País -->
      <label class="block mb-4">
        País:
        <input 
          type="text" 
          v-model="localData.pais" 
          class="w-full border p-2 rounded" 
          placeholder="Digite o país" 
        />
      </label>

      <!-- Botões -->
      <div class="flex justify-between">
        <button 
          type="button" 
          class="bg-gray-300 px-4 py-2 rounded" 
          @click="$emit('prev')"
        >
          Voltar
        </button>
        <button 
          type="submit" 
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Próximo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";

export default {
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localData: {
        razaoSocial: this.formData.customfield_shorttext17 || '',
        cnpj: this.formData.customfield_shorttext20 || '',
        nomeFantasia: this.formData.customfield_shorttext1 || '',
        cartaoCnpj: this.formData.customfield_file7 || '',
        email: this.formData.customfield_shorttext19 || '',
        atividadePrincipal: this.formData.customfield_longtext1 || '',
        telefone: this.formData.customfield_shorttext16 || '',
        dataAbertura: this.formData.customfield_date2 || '',
        cep: this.formData.customfield_shorttext18 || '',
        endereco: this.formData.customfield_shorttext23 || '',
        numero: this.formData.customfield_integer1 || '',
        complemento: this.formData.customfield_shorttext15 || '',
        bairro: this.formData.customfield_shorttext11 || '',
        cidade: this.formData.customfield_shorttext24 || '',
        uf: this.formData.customfield_shorttext6 || '',
        pais: this.formData.customfield_shorttext9 || ''
      }
    }
  },
  watch: {
    formData: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.localData = {
          razaoSocial: newValue.customfield_shorttext17 || '',
          cnpj: newValue.customfield_shorttext20 || '',
          nomeFantasia: newValue.customfield_shorttext1 || '',
          cartaoCnpj: newValue.customfield_file7 || '',
          email: newValue.customfield_shorttext19 || '',
          atividadePrincipal: newValue.customfield_longtext1 || '',
          telefone: newValue.customfield_shorttext16 || '',
          dataAbertura: newValue.customfield_date2 || '',
          cep: newValue.customfield_shorttext18 || '',
          endereco: newValue.customfield_shorttext23 || '',
          numero: newValue.customfield_integer1 || '',
          complemento: newValue.customfield_shorttext15 || '',
          bairro: newValue.customfield_shorttext11 || '',
          cidade: newValue.customfield_shorttext24 || '',
          uf: newValue.customfield_shorttext6 || '',
          pais: newValue.customfield_shorttext9 || ''
        }
      }
    }
  },
  mounted() {
    flatpickr(this.$refs.openingDatePicker, {
      dateFormat: "Y-m-d",
      locale: Portuguese,
      defaultDate: this.localData.dataAbertura || null,
      onChange: (selectedDates) => {
        if (selectedDates[0]) {
          const date = selectedDates[0];
          this.localData.dataAbertura = date.toISOString().split('T')[0] + 'T10:45:00-0300';
        }
      }
    });
  },
  methods: {
    handleNext() {
      this.$emit('next', this.localData);
    }
  }
}
</script>
