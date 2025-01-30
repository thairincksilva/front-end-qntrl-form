<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">
      Dados do Sócio {{ index + 1 }}
    </h2>
    <form @submit.prevent="handleNext" class="space-y-4">
      <!-- Nome Completo -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Nome Completo - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.nome"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          required
          :placeholder="`Digite o nome do Sócio ${index + 1}`"
        />
      </label>

      <!-- Email -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Email - Sócio {{ index + 1 }}:
        <input
          type="email"
          v-model="localData.email"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          required
          :placeholder="`Digite o email do Sócio ${index + 1}`"
        />
      </label>

      <!-- CPF -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        CPF - Sócio {{ index + 1 }}:
        <input
          v-mask="'XXX.XXX.XXX-XX'"
          type="text"
          v-model="localData.cpf"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          required
          :placeholder="`Digite o CPF do Sócio ${index + 1}`"
        />
      </label>

      <!-- Data de Nascimento -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Data de Nascimento - Sócio {{ index + 1 }}:
        <input
          type="text"
          ref="birthDatePicker"
          v-model="localData.dataNascimento"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          required
          placeholder="Selecione a data"
        />
      </label>

      <!-- Telefone -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Telefone - Sócio {{ index + 1 }}:
        <input
          v-mask="'(XX) XXXXXXXXX'"
          type="tel"
          v-model="localData.telefone"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o telefone do Sócio ${index + 1}`"
        />
      </label>

      <!-- CEP -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        CEP - Sócio {{ index + 1 }}:
        <input
          v-mask="'XXXXX-XXX'"
          type="text"
          v-model="localData.cep"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o CEP do Sócio ${index + 1}`"
        />
      </label>

      <!-- Endereço -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Endereço - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.endereco"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o endereço do Sócio ${index + 1}`"
        />
      </label>

      <!-- Número -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Número - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.numero"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o número do Sócio ${index + 1}`"
        />
      </label>

      <!-- Complemento -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Complemento - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.complemento"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o complemento do Sócio ${index + 1}`"
        />
      </label>

      <!-- Bairro -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Bairro - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.bairro"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o bairro do Sócio ${index + 1}`"
        />
      </label>

      <!-- Cidade -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Cidade - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.cidade"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite a cidade do Sócio ${index + 1}`"
        />
      </label>

      <!-- UF -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        UF - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.uf"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite a UF do Sócio ${index + 1}`"
        />
      </label>

      <!-- País -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        País - Sócio {{ index + 1 }}:
        <input
          type="text"
          v-model="localData.pais"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o país do Sócio ${index + 1}`"
        />
      </label>

      <!-- Atestado de Antecedentes Criminais -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Atestado de Antecedentes Criminais - Sócio {{ index + 1 }}:
        <div class="mt-2">
          <input
            type="file"
            :id="`antecedentes-socio-${index + 1}`"
            :name="`customfield_file${index === 0 ? '4' : index === 1 ? '10' : index === 2 ? '9' : '8'}`"
            accept=".pdf"
            class="hidden"
            @change="handleFileUpload"
            ref="fileInput"
          />
          <button 
            type="button"
            @click="$refs.fileInput.click()"
            class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Escolher arquivo PDF</span>
          </button>
        </div>
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
import { FILE_MAPPINGS } from "../../utils/fileUploadManager";
import { fileUploadManager } from "../../utils/fileUploadManager";

export default {
  props: {
    formData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      localData: this.initializeLocalData()
    }
  },
  methods: {
    initializeLocalData() {
      switch(this.index) {
        case 0: // Primeiro Sócio
          return {
            nome: this.formData.customfield_shorttext21 || '',     // Nome Completo Socio 1
            cpf: this.formData.customfield_shorttext22 || '',      // CPF Socio 1
            email: this.formData.customfield_shorttext14 || '',    // Email Socio 1
            telefone: this.formData.customfield_shorttext13 || '', // Telefone Socio 1
            dataNascimento: this.formData.customfield_date1 || '', // Data Nascimento Socio 1
            cep: this.formData.customfield_shorttext2 || '',       // CEP Socio 1
            endereco: this.formData.customfield_shorttext4 || '',  // Endereco Socio 1
            numero: this.formData.customfield_shorttext3 || '',    // Numero Socio 1
            complemento: this.formData.customfield_shorttext12 || '', // Complemento Socio 1
            bairro: this.formData.customfield_shorttext5 || '',    // Bairro Socio 1
            cidade: this.formData.customfield_shorttext8 || '',    // Cidade Socio 1
            uf: this.formData.customfield_shorttext7 || '',        // UF Socio 1
            pais: this.formData.customfield_shorttext10 || '',     // Pais Socio 1
            antecedentes: this.formData.customfield_file4 || null  // Antecedentes Criminais Socio 1
          };
        case 1: // Segundo Sócio
          return {
            nome: this.formData.customfield_shorttext48 || '',     // Nome Completo Socio 2
            cpf: this.formData.customfield_shorttext60 || '',      // CPF Socio 2
            email: this.formData.customfield_shorttext52 || '',    // Email Socio 2
            telefone: this.formData.customfield_shorttext40 || '', // Telefone Socio 2
            dataNascimento: this.formData.customfield_date5 || '', // Data Nascimento Socio 2
            cep: this.formData.customfield_shorttext55 || '',      // CEP Socio 2
            endereco: this.formData.customfield_shorttext42 || '', // Endereco Socio 2
            numero: this.formData.customfield_shorttext57 || '',   // Numero Socio 2
            complemento: this.formData.customfield_shorttext49 || '', // Complemento Socio 2
            bairro: this.formData.customfield_shorttext58 || '',   // Bairro Socio 2
            cidade: this.formData.customfield_shorttext46 || '',   // Cidade Socio 2
            uf: this.formData.customfield_shorttext59 || '',       // UF Socio 2
            pais: this.formData.customfield_shorttext53 || '',     // Pais Socio 2
            antecedentes: this.formData.customfield_file10 || null // Antecedentes Criminais Socio 2
          };
        case 2: // Terceiro Sócio
          return {
            nome: this.formData.customfield_shorttext51 || '',     // Nome Completo Socio 3
            cpf: this.formData.customfield_shorttext31 || '',      // CPF Socio 3
            email: this.formData.customfield_shorttext56 || '',    // Email Socio 3
            telefone: this.formData.customfield_shorttext35 || '', // Telefone Socio 3
            dataNascimento: this.formData.customfield_date3 || '', // Data Nascimento Socio 3
            cep: this.formData.customfield_shorttext25 || '',      // CEP Socio 3
            endereco: this.formData.customfield_shorttext38 || '', // Endereco Socio 3
            numero: this.formData.customfield_shorttext30 || '',   // Numero Socio 3
            complemento: this.formData.customfield_shorttext37 || '', // Complemento Socio 3
            bairro: this.formData.customfield_shorttext28 || '',   // Bairro Socio 3
            cidade: this.formData.customfield_shorttext39 || '',   // Cidade Socio 3
            uf: this.formData.customfield_shorttext33 || '',       // UF Socio 3
            pais: this.formData.customfield_shorttext41 || '',     // Pais Socio 3
            antecedentes: this.formData.customfield_file9 || null  // Antecedentes Criminais Socio 3
          };
        case 3: // Quarto Sócio
          return {
            nome: this.formData.customfield_shorttext44 || '',     // Nome Completo Socio 4
            cpf: this.formData.customfield_shorttext27 || '',      // CPF Socio 4
            email: this.formData.customfield_shorttext43 || '',    // Email Socio 4
            telefone: this.formData.customfield_shorttext26 || '', // Telefone Socio 4
            dataNascimento: this.formData.customfield_date4 || '', // Data Nascimento Socio 4
            cep: this.formData.customfield_shorttext45 || '',      // CEP Socio 4
            endereco: this.formData.customfield_shorttext29 || '', // Endereco Socio 4
            numero: this.formData.customfield_shorttext50 || '',   // Numero Socio 4
            complemento: this.formData.customfield_shorttext34 || '', // Complemento Socio 4
            bairro: this.formData.customfield_shorttext47 || '',   // Bairro Socio 4
            cidade: this.formData.customfield_shorttext32 || '',   // Cidade Socio 4
            uf: this.formData.customfield_shorttext54 || '',       // UF Socio 4
            pais: this.formData.customfield_shorttext36 || '',     // Pais Socio 4
            antecedentes: this.formData.customfield_file8 || null  // Antecedentes Criminais Socio 4
          };
        default:
          return {};
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const fieldMapping = {
          0: 'antecedentesS1',
          1: 'antecedentesS2',
          2: 'antecedentesS3',
          3: 'antecedentesS4'
        };
        
        const mappingKey = fieldMapping[this.index];
        const customFieldName = FILE_MAPPINGS[mappingKey];
        
        if (customFieldName) {
          fileUploadManager.addFile(customFieldName, file);
          this.localData.antecedentes = file;
          
          console.log(`Antecedentes do Sócio ${this.index + 1} selecionado:`, {
            nome: file.name,
            tamanho: file.size,
            tipo: file.type,
            campo: customFieldName
          });
        }
      }
    },
    handleNext() {
      this.$emit('next', {
        ...this.localData,
        socioIndex: this.index
      });
    }
  },
  watch: {
    formData: {
      immediate: true,
      deep: true,
      handler() {
        this.localData = this.initializeLocalData();
      }
    }
  },
  mounted() {
    flatpickr(this.$refs.birthDatePicker, {
      dateFormat: "Y-m-d", // Alterado formato da data
      locale: Portuguese,
      defaultDate: this.localData.dataNascimento || null,
      onChange: (selectedDates) => {
        // Formata a data para o padrão ISO com timezone
        if (selectedDates[0]) {
          const date = selectedDates[0];
          this.localData.dataNascimento = date.toISOString().split('T')[0] + 'T10:45:00-0300';
        }
      }
    });
  }
};
</script>
