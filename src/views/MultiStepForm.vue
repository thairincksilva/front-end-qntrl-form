<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center">
    <StepNavigation :steps="steps.map((step) => step.title)" :currentStep="currentStep" />
    <div class="flex-grow p-6 w-full max-w-4xl bg-white rounded shadow mt-4">
      <component
        :is="steps[currentStep].component"
        :form-data="formData"
        :has-first-partner="formData.isSocio1"
        :index="currentStepProps.index"
        @next="handleNextStep"
        @prev="handlePreviousStep"
      />
    </div>

    <!-- Mensagens de feedback -->
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-700 rounded">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import StepNavigation from "../components/StepNavigation.vue";
import StepDetails from "../components/steps/StepDetails.vue";
import StepCompany from "../components/steps/StepCompany.vue";
import StepAdmin from "../components/steps/StepAdmin.vue";
import StepDocuments from "../components/steps/StepDocuments.vue";
import StepTriagem from "../components/steps/StepTriagem.vue";
import StepSummary from '../components/steps/StepSummary.vue'
import api from "../services/api";
import { fileUploadManager } from "../utils/fileUploadManager";
import { markRaw } from 'vue'

export default {
  name: "MultiStepForm",
  components: {
    StepNavigation,
    StepDetails,
    StepCompany,
    StepAdmin,
    StepDocuments,
    StepTriagem,
    StepSummary
  },
  data() {
    return {
      currentStep: 0,
      socioCount: 1,
      isSubmitting: false,
      steps: [
        {
          component: 'StepTriagem',
          title: 'Triagem'
        },
        {
          component: 'StepDetails',
          title: 'Dados do Solicitante'
        },
        {
          component: 'StepAdmin',
          title: 'Sócios Assinantes'
        },
        {
          component: 'StepCompany',
          title: 'Dados da Empresa'
        },
        {
          component: 'StepDocuments',
          title: 'Documentos'
        },
        {
          component: 'StepSummary',
          title: 'Resumo'
        }
      ],
      errorMessage: "",
      successMessage: "",
      partnerData: {},
      hasFirstPartner: false,
      maxPartners: 4,
      tempDetailsData: null,
      formData: {
        isSocio1: false,
        customfield_integer2: '',
        title: '',
        description: '',
        record_owner: '',
        duedate: '',
        priority: '',
        solicitante: {
          cnpj: '',
          nome: '',
          email: '',
        }
      },
      tempUserData: null,
      sociosCache: {}
    };
  },
  computed: {
    currentStepProps() {
      return {
        formData: this.formData,
        cnpjData: this.formData.cnpjData,
        hasFirstPartner: this.formData.isSocio1,
        index: this.currentStep >= 2 && this.currentStep < this.steps.length - 2 ? 
          this.currentStep - 2 : null
      };
    },
    currentComponent() {
      return this.steps[this.currentStep]?.component;
    },
    formattedJson() {
      const cleanData = Object.fromEntries(
        Object.entries(this.formData)
          .map(([key, value]) => {
            if (value instanceof File) {
              return [
                key,
                {
                  name: value.name,
                  size: value.size,
                  type: value.type,
                },
              ];
            }
            return [key, value];
          })
          .filter(([_, value]) => value !== "" && value !== null && value !== undefined)
      );

      const files = fileUploadManager.getAllFiles();
      Object.entries(files).forEach(([key, file]) => {
        cleanData[key] = {
          name: file.name,
          size: file.size,
          type: file.type,
        };
      });

      return JSON.stringify(cleanData, null, 2);
    },
  },
  methods: {
    handleNextStep(stepData) {
      // Garantir que as datas mantenham o formato ao serem combinadas no formData
      const processedData = { ...stepData };
      
      // Lista de campos de data para verificar
      const dateFields = ['customfield_date1', 'customfield_date2', 'customfield_date3', 'customfield_date4', 'customfield_date5'];
      
      dateFields.forEach(field => {
        if (processedData[field] && !processedData[field].includes('T10:45:00-0300')) {
          processedData[field] = processedData[field] + 'T10:45:00-0300';
        }
      });

      this.formData = {
        ...this.formData,
        ...processedData,
        solicitante: {
          ...this.formData.solicitante,
          ...(stepData.solicitante || {})
        }
      };

      // Log detalhado do estado atual do formulário
      console.group(`Dados do formulário após etapa ${this.currentStep + 1}`);
      console.log('Nome do componente atual:', this.steps[this.currentStep].component?.name);
      console.log('Dados recebidos do componente:', stepData);
      console.log('Estado atual completo do formulário:', JSON.stringify(this.formData, null, 2));
      console.groupEnd();
      
      if (this.currentStep < this.steps.length - 1) {
        // Verifica se o componente atual é StepCompany
        const currentComponent = this.steps[this.currentStep].component;
        if (currentComponent?.name === 'StepCompany') {
          // Encontra o índice do StepDocuments
          const documentsIndex = this.steps.findIndex(step => step.component?.name === 'StepDocuments');
          if (documentsIndex !== -1) {
            this.currentStep = documentsIndex;
            return;
          }
        }
        this.currentStep++;
      }
    },
    handlePreviousStep(data) {
      if (this.currentStep > 0) {
        // Se estiver no StepDocuments e vier do StepCompany
        if (
          this.steps[this.currentStep].component?.name === 'StepDocuments' &&
          data?.fromComponent === 'StepCompany'
        ) {
          // Encontra o índice do StepCompany
          const companyIndex = this.steps.findIndex(step => step.component?.name === 'StepCompany');
          if (companyIndex !== -1) {
            this.currentStep = companyIndex;
            return;
          }
        }
        this.currentStep--;
      }
    },
    async handleSubmit() {
      if (this.isSubmitting) return;
      
      this.isSubmitting = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const formData = new FormData();
        const fieldsToExclude = [
          "description",
          "isSocio1", 
          "numberOfPartners", 
          "totalPartners",
          "tipoAssinatura",
          "quantidadeSocios",
          "isResponsible",
          "isSocioAdmin",
          "solicitante"
        ];

        formData.append("title", this.formData.customfield_shorttext17 || "Nova Solicitação");
        formData.append("priority", "33662000000000287");
        formData.append("description", this.formData.description || "");

        Object.entries(this.formData).forEach(([key, value]) => {
          if (fieldsToExclude.includes(key)) {
            return;
          }

          if (value instanceof File) {
            formData.append(key, value);
          } 
          else if (value !== null && value !== undefined && value !== '') {
            formData.append(key, value);
          }
        });

        const files = fileUploadManager.getAllFiles();
        Object.entries(files).forEach(([key, file]) => {
          formData.append(key, file);
        });

        console.log("=== Dados sendo enviados ===");
        for (let [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`${key}: ${value.name} (${value.size} bytes)`);
          } else {
            console.log(`${key}: ${value}`);
          }
        }

        const response = await api.post("/cards", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201 || response.status === 200) {
          this.successMessage = "Formulário enviado com sucesso!";
          fileUploadManager.clear();
        }
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        this.errorMessage = error.message;
      } finally {
        this.isSubmitting = false;
      }
    },
    setupStepsBasedOnPartners(numberOfPartners) {
      const baseSteps = [
        { title: "Início", component: StepTriagem },
        { title: "Solicitante", component: StepDetails },
        { title: "Sócios", component: StepAdmin },
        { title: "Empresa", component: StepCompany }
      ];

      // Se tem sócio solicitante, limita a 3 sócios adicionais
      const maxSocios = this.formData.isSocio1 ? 3 : 4;
      const sociosParaAdicionar = Math.min(numberOfPartners, maxSocios);

      for (let i = 0; i < sociosParaAdicionar; i++) {
        const displayNumber = this.formData.isSocio1 ? i + 2 : i + 1;
        baseSteps.push({
          title: `Sócio ${displayNumber}`,
          component: StepAdmin,
          index: i
        });
      }

      baseSteps.push({ title: "Documentos", component: StepDocuments });
      this.steps = baseSteps;
    },
    mapStepDataToFields(data, index) {
      console.log('Mapeando dados do step:', this.currentStep, 'Com dados:', data);
      
      switch(this.currentStep) {
        case 0:
          return {
            customfield_shorttext61: data.codigoReferencia || ''
          };

        case 1:
          if (data.isResponsible && data.isPartner) {
            return {
              isSocio1: true,
              customfield_shorttext21: data.nomeCompleto || '',
              customfield_shorttext22: data.cpf || '',
              customfield_shorttext14: data.email || '',
              customfield_shorttext13: data.telefone || '',
              customfield_date1: data.dataNascimento || '',
              customfield_file4: data.antecedentes || null,
              customfield_shorttext2: data.cep || '',
              customfield_shorttext4: data.endereco || '',
              customfield_shorttext3: data.numero || '',
              customfield_shorttext12: data.complemento || '',
              customfield_shorttext5: data.bairro || '',
              customfield_shorttext8: data.cidade || '',
              customfield_shorttext7: data.uf || '',
              customfield_shorttext10: data.pais || ''
            };
          }
          return { isSocio1: false };

        case 2:
          return {
            customfield_integer2: data.numberOfPartners || '',
            customfield_shorttext20: data.cnpj || '',
            customfield_shorttext17: data.razaoSocial || '',
            customfield_shorttext1: data.nomeFantasia || '',
            customfield_shorttext19: data.email || '',
            customfield_longtext1: data.atividadePrincipal || '',
            customfield_shorttext16: data.telefone || '',
            customfield_date2: data.dataAbertura || '',
            customfield_shorttext18: data.cep || '',
            customfield_shorttext23: data.endereco || '',
            customfield_integer1: data.numero || '',
            customfield_shorttext15: data.complemento || '',
            customfield_shorttext11: data.bairro || '',
            customfield_shorttext24: data.cidade || '',
            customfield_shorttext6: data.uf || '',
            customfield_shorttext9: data.pais || '',
            customfield_file7: data.cartaoCnpj || null
          };

        default:
          if (this.currentStep >= 3) {
            const mappingIndex = this.formData.isSocio1 ? 
              this.currentStep - 2 :
              this.currentStep - 3;

            console.log('Índice para mapping:', mappingIndex);
            return this.mapSocioFields(data, mappingIndex);
          }
          return data;
      }
    },
    mapSocioFields(data, mappingIndex) {
      // Ajusta o índice de mapeamento baseado no sócio solicitante
      const adjustedIndex = this.formData.isSocio1 ? mappingIndex + 1 : mappingIndex;
      
      const mappings = {
        0: this.formData.isSocio1 ? 1 : 0, // Primeiro sócio adicional
        1: this.formData.isSocio1 ? 2 : 1, // Segundo sócio adicional
        2: this.formData.isSocio1 ? 3 : 2, // Terceiro sócio adicional
        3: 3 // Quarto sócio (apenas quando não há sócio solicitante)
      };

      const mappingKey = mappings[adjustedIndex];
      
      console.log('Debug - Novo Mapeamento:', {
        originalIndex: mappingIndex,
        mappingKey,
        isSocio1: this.formData.isSocio1,
        currentStep: this.currentStep
      });

      // Limpa TODOS os campos do sócio atual antes de mapear
      this.cleanPartnerFields(mappingKey);

      const mapping = mappings[mappingKey];
      if (!mapping) {
        console.error('Mapping não encontrado para índice:', mappingKey);
        return data;
      }

      // Cria um novo objeto com os dados mapeados
      const result = {};
      Object.entries(data).forEach(([key, value]) => {
        if (mapping[key]) {
          result[mapping[key]] = value;
        }
      });

      console.log('Dados mapeados para sócio:', mappingKey, result);
      return result;
    },
    getPartnerMapping(index) {
      const mappings = [
        {
          nome: 'customfield_shorttext48',
          cpf: 'customfield_shorttext60',
          email: 'customfield_shorttext52',
          telefone: 'customfield_shorttext40',
          dataNascimento: 'customfield_date5',
          antecedentes: 'customfield_file10',
          cep: 'customfield_shorttext55',
          endereco: 'customfield_shorttext42',
          numero: 'customfield_shorttext57',
          complemento: 'customfield_shorttext49',
          bairro: 'customfield_shorttext58',
          cidade: 'customfield_shorttext46',
          uf: 'customfield_shorttext59',
          pais: 'customfield_shorttext53'
        },
        // ... outros mappings existentes
      ];
      return mappings[index] || {};
    },
    cleanPartnerFields(currentIndex) {
      const partnerPrefixes = {
        1: ['customfield_shorttext48', 'customfield_shorttext60', 'customfield_shorttext52', 
            'customfield_shorttext40', 'customfield_date5', 'customfield_file10', 
            'customfield_shorttext55', 'customfield_shorttext42', 'customfield_shorttext57', 
            'customfield_shorttext49', 'customfield_shorttext58', 'customfield_shorttext46', 
            'customfield_shorttext59', 'customfield_shorttext53'],
        2: ['customfield_shorttext51', 'customfield_shorttext31', 'customfield_shorttext56', 
            'customfield_shorttext35', 'customfield_date3', 'customfield_file9', 
            'customfield_shorttext25', 'customfield_shorttext38', 'customfield_shorttext30', 
            'customfield_shorttext37', 'customfield_shorttext28', 'customfield_shorttext39', 
            'customfield_shorttext33', 'customfield_shorttext41'],
        3: ['customfield_shorttext44', 'customfield_shorttext27', 'customfield_shorttext43', 
            'customfield_shorttext26', 'customfield_date4', 'customfield_file8', 
            'customfield_shorttext45', 'customfield_shorttext29', 'customfield_shorttext50', 
            'customfield_shorttext34', 'customfield_shorttext47', 'customfield_shorttext32', 
            'customfield_shorttext54', 'customfield_shorttext36']
      };

      // Limpa os campos do sócio atual
      const fieldsToClean = partnerPrefixes[currentIndex] || [];
      fieldsToClean.forEach(field => {
        if (this.formData[field]) {
          this.$delete 
            ? this.$delete(this.formData, field)
            : delete this.formData[field];
        }
      });

      // Força a atualização do Vue
      this.formData = { ...this.formData };
    },
    resetSociosCache() {
      this.sociosCache = {};
    },
    resetForm() {
      this.currentStep = 0;
      this.formData = {};
      this.errorMessage = '';
      this.successMessage = '';
      fileUploadManager.clear();
      this.setupStepsBasedOnPartners(0);
    },
    async submitForm() {
      // Implemente a lógica para enviar o formulário
      // ...
      return { success: true };
    }
  },
  watch: {
    'formData.customfield_integer2': {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.socioCount = parseInt(newValue);
          this.setupStepsBasedOnPartners(this.socioCount);
        }
      }
    },
    'formData.isSocio1': {
      immediate: true,
      handler(newValue) {
        console.log('Watch - isSocio1 mudou para:', newValue);
      }
    }
  },
  mounted() {
    this.setupStepsBasedOnPartners(this.socioCount);
  }
};
</script>
