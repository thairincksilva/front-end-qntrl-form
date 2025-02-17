<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">
      Dados da Empresa</h2>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#991B1B]"></div>
    </div>

    <form @submit.prevent="handleNext" class="space-y-6">
      <!-- CNPJ (Bloqueado) -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        CNPJ:
        <input type="text" v-model="localData.cnpj" disabled
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed font-inter" />
      </label>

      <!-- Cartão CNPJ -->
      <div class="relative block w-full mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-6 font-inter">
          Cartão CNPJ:
          <input type="file" @change="handleFileUpload" class="hidden" ref="fileInput" accept=".pdf" />
          <button type="button" @click="$refs.fileInput.click()"
            class="w-full px-4 py-3 rounded-[0.75rem] border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-inter">
            <span>{{ selectedFileName || 'Escolher arquivo PDF' }}</span>
          </button>
        </label>
      </div>

      <!-- Razão Social -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Razão Social:
        <input type="text" v-model="localData.razaoSocial"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a razão social" />
      </label>

      <!-- Nome Fantasia -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Nome Fantasia:
        <input type="text" v-model="localData.nomeFantasia"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o nome fantasia" />
      </label>

      <!-- Email -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Email:
        <input type="email" v-model="localData.email"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o email" />
      </label>

      <!-- Atividade Principal -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Atividade Principal:
        <input type="text" v-model="localData.atividadePrincipal"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a atividade principal" />
      </label>

      <!-- Telefone -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Telefone:
        <input v-mask="'(XX) XXXXXXXXX'" type="tel" v-model="localData.telefone"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o telefone" />
      </label>

      <!-- Data de Abertura -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Data de Abertura:
        <input type="text" ref="openingDatePicker" v-model="localData.dataAbertura"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Selecione a data" />
      </label>

      <!-- CEP -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        CEP:
        <input v-mask="'XXXXX-XXX'" type="text" v-model="localData.cep"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o CEP" />
      </label>

      <!-- Endereço -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Endereço:
        <input type="text" v-model="localData.endereco"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o endereço" />
      </label>

      <!-- Número -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Número:
        <input type="text" v-model="localData.numero"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o número" />
      </label>

      <!-- Complemento -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Complemento:
        <input type="text" v-model="localData.complemento"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o complemento" />
      </label>

      <!-- Bairro -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Bairro:
        <input type="text" v-model="localData.bairro"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o bairro" />
      </label>

      <!-- Cidade -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Cidade:
        <input type="text" v-model="localData.cidade"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a cidade" />
      </label>

      <!-- UF -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        UF:
        <input type="text" v-model="localData.uf"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a UF" />
      </label>

      <!-- País -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        País:
        <input type="text" v-model="localData.pais"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite o país" />
      </label>

      <!-- Botões -->
      <div class="flex justify-between pt-4">
        <button type="button"
          class="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg"
          @click="$emit('prev')">
          Voltar
        </button>
        <button type="submit"
          class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105">
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
import Swal from 'sweetalert2';

export default {
  name: 'StepCompany',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedFileName: '',
      localData: {
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        email: '',
        atividadePrincipal: '',
        telefone: '',
        dataAbertura: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        pais: 'Brasil',
        cartaoCnpj: null
      },
      isLoading: true
    }
  },
  async created() {
    console.log('StepCompany created - formData completo:', this.formData);

    // Busca o CNPJ diretamente do campo correto
    const cnpj = this.formData.customfield_shorttext20;

    if (cnpj) {
      console.log('CNPJ encontrado:', cnpj);
      await this.buscarDadosEmpresa(cnpj);
    } else {
      console.error('CNPJ não encontrado no formData');
      this.isLoading = false;
      await Swal.fire({
        title: 'Erro',
        text: 'CNPJ não encontrado. Por favor, verifique se o CNPJ foi preenchido corretamente na etapa anterior.',
        icon: 'error',
        confirmButtonColor: '#991B1B'
      });
    }
  },
  mounted() {
    // Inicializa o flatpickr para o campo de data
    if (this.$refs.openingDatePicker) {
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
    }
  },
  methods: {
    async buscarDadosEmpresa(cnpj) {
      this.isLoading = true;
      try {
        console.log('Iniciando busca para o CNPJ:', cnpj);
        const cnpjLimpo = cnpj.replace(/\D/g, '');

        if (cnpjLimpo.length !== 14) {
          throw new Error('CNPJ inválido');
        }

        console.log('CNPJ limpo:', cnpjLimpo);
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
        const data = await response.json();

        console.log('Resposta da API:', data);

        if (response.ok) {
          this.localData = {
            ...this.localData,
            cnpj: cnpj,
            razaoSocial: data.razao_social || '',
            nomeFantasia: data.nome_fantasia || '',
            atividadePrincipal: data.cnae_fiscal_descricao || '',
            telefone: data.ddd_telefone_1 ? `(${data.ddd_telefone_1}) ${data.telefone_1}` : '',
            dataAbertura: data.data_inicio_atividade || '',
            cep: data.cep || '',
            endereco: data.logradouro || '',
            numero: data.numero || '',
            complemento: data.complemento || '',
            bairro: data.bairro || '',
            cidade: data.municipio || '',
            uf: data.uf || '',
            pais: 'Brasil'
          };

          console.log('Dados da empresa preenchidos com sucesso:', this.localData);
        } else {
          throw new Error('Erro ao buscar dados da empresa');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da empresa:', error);
        await Swal.fire({
          title: 'Erro',
          text: 'Não foi possível carregar os dados da empresa. Por favor, preencha manualmente.',
          icon: 'error',
          confirmButtonColor: '#991B1B'
        });
      } finally {
        this.isLoading = false;
      }
    },
    handleNext() {
      // Enviando apenas os campos com os api names corretos
      const formData = {
        // Removemos os campos sem api names e mantemos apenas os mapeados
        customfield_shorttext17: this.localData.razaoSocial, // Razão Social
        customfield_shorttext1: this.localData.nomeFantasia, // Nome Fantasia
        customfield_shorttext19: this.localData.email, // Email
        customfield_longtext1: this.localData.atividadePrincipal, // Atividade Principal
        customfield_shorttext16: this.localData.telefone, // Telefone
        customfield_date2: this.localData.dataAbertura + 'T10:45:00-0300',
        customfield_shorttext18: this.localData.cep, // CEP
        customfield_shorttext23: this.localData.endereco, // Endereço
        customfield_integer1: this.localData.numero, // Número
        customfield_shorttext15: this.localData.complemento, // Complemento
        customfield_shorttext11: this.localData.bairro, // Bairro
        customfield_shorttext24: this.localData.cidade, // Cidade
        customfield_shorttext6: this.localData.uf, // UF
        customfield_shorttext9: this.localData.pais, // País
        customfield_file7: this.localData.cartaoCnpj // Cartão CNPJ
      };

      // Removemos campos undefined ou null
      Object.keys(formData).forEach(key => {
        if (formData[key] === undefined || formData[key] === null) {
          delete formData[key];
        }
      });

      this.$emit("next", formData);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFileName = file.name;
        this.localData.cartaoCnpj = file;
      }
    }
  }
}
</script>
