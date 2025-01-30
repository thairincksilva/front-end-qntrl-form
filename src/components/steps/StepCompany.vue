<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">Dados da Empresa</h2>
    <form @submit.prevent="handleNext" class="space-y-6">
      <!-- CNPJ -->
      <label class="block text-sm font-medium text-gray-700 mb-6 font-inter">
        CNPJ:
        <input
          v-mask="'XX.XXX.XXX/XXXX-XX'"
          type="text"
          v-model="localData.cnpj"
          class="w-full px-4 py-3 rounded-[0.75rem] border-gray-300 bg-white shadow-sm hover:border-gray-400 focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 focus:ring-opacity-50 transition-all duration-200 font-inter placeholder-gray-400"
          required
          placeholder="Digite o CNPJ"
        />
      </label>

      <!-- Cartão CNPJ -->
      <div class="relative block w-full mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-6 font-inter">
          Cartão CNPJ:
          <input
            type="file"
            @change="handleFileUpload"
            class="hidden"
            ref="fileInput"
            accept=".pdf"
          />
          <button 
            type="button"
            @click="$refs.fileInput.click()"
            class="w-full px-4 py-3 rounded-[0.75rem] border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-inter"
          >
            <span>Escolher arquivo PDF</span>
          </button>
        </label>
      </div>

      <!-- Razão Social -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Razão Social:
        <input 
          type="text" 
          v-model="localData.razaoSocial" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          required 
          placeholder="Digite a razão social" 
        />
      </label>

      <!-- Nome Fantasia -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Nome Fantasia:
        <input 
          type="text" 
          v-model="localData.nomeFantasia" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o nome fantasia" 
        />
      </label>

      <!-- Email -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Email:
        <input 
          type="email" 
          v-model="localData.email" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o email" 
        />
      </label>

      <!-- Atividade Principal -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Atividade Principal:
        <input 
          type="text" 
          v-model="localData.atividadePrincipal" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a atividade principal" 
        />
      </label>

      <!-- Telefone -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Telefone:
        <input 
          v-mask="'(XX) XXXXXXXXX'" 
          type="tel" 
          v-model="localData.telefone" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o telefone" 
        />
      </label>

      <!-- Data de Abertura -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Data de Abertura:
        <input
          type="text"
          ref="openingDatePicker"
          v-model="localData.dataAbertura"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Selecione a data"
        />
      </label>

      <!-- CEP -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        CEP:
        <input 
          v-mask="'XXXXX-XXX'" 
          type="text" 
          v-model="localData.cep" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o CEP" 
        />
      </label>

      <!-- Endereço -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Endereço:
        <input 
          type="text" 
          v-model="localData.endereco" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o endereço" 
        />
      </label>

      <!-- Número -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Número:
        <input 
          type="text" 
          v-model="localData.numero" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o número" 
        />
      </label>

      <!-- Complemento -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Complemento:
        <input 
          type="text" 
          v-model="localData.complemento" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o complemento" 
        />
      </label>

      <!-- Bairro -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Bairro:
        <input 
          type="text" 
          v-model="localData.bairro" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o bairro" 
        />
      </label>

      <!-- Cidade -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Cidade:
        <input 
          type="text" 
          v-model="localData.cidade" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a cidade" 
        />
      </label>

      <!-- UF -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        UF:
        <input 
          type="text" 
          v-model="localData.uf" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a UF" 
        />
      </label>

      <!-- País -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        País:
        <input 
          type="text" 
          v-model="localData.pais" 
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o país" 
        />
      </label>

      <!-- Botões -->
      <div class="flex justify-between pt-4">
        <button 
          type="button" 
          class="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg"
          @click="$emit('prev')"
        >
          Voltar
        </button>
        <button 
          type="submit" 
          class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105"
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
