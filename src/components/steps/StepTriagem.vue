<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">Processo Embracon</h2>

    <p class="mb-8 text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris.
    </p>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-700">Dados Iniciais</h3>
        
        <!-- Campo CNPJ comentado temporariamente
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          CNPJ da Empresa:
          <input
            v-imask="maskOptions"
            type="text"
            v-model="localData.cnpj"
            @blur="buscarDadosCNPJ"
            class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
            placeholder="00.000.000/0000-00"
          />
        </label>
        -->
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Código Referência:
          <input
            type="text"
            v-model="localData.codigoReferencia"
            class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
            placeholder="Digite o código de referência"
          />
        </label>
      </div>

      <!-- Botões -->
      <div class="flex justify-end pt-4">
        <button
          type="button"
          @click="handleNext"
          class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105"
        >
          Iniciar Processo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { IMaskDirective } from 'vue-imask'
import Swal from 'sweetalert2'

export default {
  name: "StepTriagem",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  /* Diretiva IMask comentada temporariamente
  directives: {
    imask: IMaskDirective
  },
  */
  data() {
    return {
      localData: {
        codigoReferencia: this.formData?.customfield_shorttext61 || "",
        // cnpj: ''
      },
      /* Máscara CNPJ comentada temporariamente
      maskOptions: {
        mask: '00.000.000/0000-00'
      }
      */
    };
  },
  methods: {
    handleNext() {
      /* Lógica CNPJ comentada temporariamente
      const cnpjLimpo = this.localData.cnpj.replace(/[^0-9]/g, '');
      this.$emit("next", {
        ...this.localData,
        cnpj: cnpjLimpo
      });
      */
      this.$emit("next", this.localData);
    },
    mapFields(data) {
      return {
        customfield_shorttext61: data.codigoReferencia || "",
      };
    },
    /* Método de busca CNPJ comentado temporariamente
    async buscarDadosCNPJ() {
      if (!this.localData.cnpj) return;
      
      try {
        const cnpjLimpo = this.localData.cnpj.replace(/\D/g, '');
        
        if (cnpjLimpo.length !== 14) {
          await Swal.fire({
            title: 'CNPJ Inválido',
            text: 'Por favor, digite um CNPJ válido com 14 dígitos.',
            icon: 'error',
            confirmButtonColor: '#991B1B'
          });
          return;
        }

        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
        const data = await response.json();
        
        if (response.ok) {
          this.$emit('cnpj-data', data);
          await Swal.fire({
            title: 'CNPJ Encontrado',
            html: `Seu CNPJ foi encontrado com sucesso, vamos prosseguir com o cadastro para:<br><br> <span class="font-bold">${data.razao_social}</span>`,
            icon: 'success',
            confirmButtonColor: '#991B1B'
          });
        } else {
          await Swal.fire({
            title: 'CNPJ não encontrado',
            text: 'Não foi possível encontrar os dados deste CNPJ. Por favor, verifique o número e tente novamente.',
            icon: 'error',
            confirmButtonColor: '#991B1B'
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
        await Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao buscar os dados do CNPJ. Por favor, tente novamente.',
          icon: 'error',
          confirmButtonColor: '#991B1B'
        });
      }
    }
    */
  },
};
</script>
