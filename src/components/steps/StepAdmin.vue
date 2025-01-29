<template>
  <div>
    <h2 class="text-xl font-bold mb-4">
      Dados do Sócio {{ index + 1 }}
    </h2>
    <form @submit.prevent="handleNext">
      <!-- Nome Completo -->
      <label class="block mb-2">
        Nome Completo:
        <input
          type="text"
          v-model="localData.nome"
          class="w-full border p-2 rounded"
          required
          placeholder="Digite o nome completo"
        />
      </label>

      <!-- Email -->
      <label class="block mb-2">
        Email:
        <input
          type="email"
          v-model="localData.email"
          class="w-full border p-2 rounded"
          required
          placeholder="Digite o email"
        />
      </label>

      <!-- CPF -->
      <label class="block mb-2">
        CPF:
        <input
          v-mask="'XXX.XXX.XXX-XX'"
          type="text"
          v-model="localData.cpf"
          class="w-full border p-2 rounded"
          required
          placeholder="Digite o CPF"
        />
      </label>

      <!-- Data de Nascimento -->
      <label class="block mb-2">
        Data de Nascimento:
        <input
          type="text"
          ref="birthDatePicker"
          v-model="localData.dataNascimento"
          class="w-full border p-2 rounded"
          required
          placeholder="Selecione a data"
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

      <!-- Atestado de Antecedentes Criminais -->
      <label class="block mb-4">
        Atestado de Antecedentes Criminais:
        <input
          type="file"
          @change="handleFileUpload"
          class="w-full border p-2 rounded"
          accept=".pdf,.doc,.docx"
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
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
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
