<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center">
    <StepNavigation :steps="steps.map((step) => step.title)" :currentStep="currentStep" />
    <div class="flex-grow p-6 w-full max-w-4xl bg-white rounded shadow mt-4">
      <component
        v-if="currentStep < steps.length - 1"
        :is="steps[currentStep].component"
        :formData="formData"
        :index="currentStepProps.index"
        @next="handleNextStep"
        @prev="handlePreviousStep"
      />

      <!-- Última etapa: Exibição do JSON -->
      <div v-else>
        <h2 class="text-xl font-bold mb-4">Resumo dos Dados</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">{{ formattedJson }}</pre>
        <div class="flex justify-between mt-4">
          <button class="bg-gray-300 px-4 py-2 rounded" @click="handlePreviousStep">Voltar</button>
          <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="handleSubmit" :disabled="isSubmitting">
            {{ isSubmitting ? "Enviando..." : "Confirmar e Enviar" }}
          </button>
        </div>
      </div>
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
import api from "../services/api";
import { formatDate, formatPhone, formatDateBR } from "../utils/formatters";
import { handleFileUpload } from "../utils/fileHandlers";
import axios from "axios";
import { fileUploadManager } from "../utils/fileUploadManager";

export default {
  name: "MultiStepForm",
  components: {
    StepNavigation,
    StepDetails,
    StepCompany,
    StepAdmin,
    StepDocuments,
  },
  data() {
    return {
      currentStep: 0,
      socioCount: 1,
      isSubmitting: false,
      steps: [],
      formData: {
        // Campos padrão
        title: "",
        description: "",
        record_owner: "",
        duedate: "",
        priority: "",

        // Dados da Empresa
        customfield_shorttext17: "", // Razão Social
        customfield_shorttext20: "", // CNPJ
        customfield_shorttext1: "", // Nome Fantasia
        customfield_file7: "", // Cartão CNPJ
        customfield_shorttext19: "", // Email
        customfield_longtext1: "", // Atividade Principal
        customfield_shorttext16: "", // Telefone
        customfield_date2: "", // Data Abertura
        customfield_shorttext18: "", // CEP
        customfield_shorttext23: "", // Endereço
        customfield_integer1: "", // Número
        customfield_shorttext15: "", // Complemento
        customfield_shorttext11: "", // Bairro
        customfield_shorttext24: "", // Cidade
        customfield_shorttext6: "", // UF
        customfield_shorttext9: "", // País

        // Dados do Primeiro Sócio
        customfield_shorttext21: "", // Nome Completo Sócio 1
        customfield_shorttext22: "", // CPF Sócio 1
        customfield_shorttext14: "", // Email Sócio 1
        customfield_shorttext13: "", // Telefone Sócio 1
        customfield_date1: "", // Data Nascimento Sócio 1
        customfield_file4: "", // Atestado Antecedentes Criminais Sócio 1
        customfield_shorttext2: "", // CEP Sócio 1
        customfield_shorttext4: "", // Endereço Sócio 1
        customfield_shorttext3: "", // Número Sócio 1
        customfield_shorttext12: "", // Complemento Sócio 1
        customfield_shorttext5: "", // Bairro Sócio 1
        customfield_shorttext8: "", // Cidade Sócio 1
        customfield_shorttext7: "", // UF Sócio 1
        customfield_shorttext10: "", // País Sócio 1

        // Dados do Segundo Sócio
        customfield_shorttext48: "", // Nome Completo Sócio 2
        customfield_shorttext60: "", // CPF Sócio 2
        customfield_shorttext52: "", // Email Sócio 2
        customfield_shorttext40: "", // Telefone Sócio 2
        customfield_date5: "", // Data Nascimento Sócio 2
        customfield_file10: "", // Atestado Antecedentes Criminais Sócio 2
        customfield_shorttext55: "", // CEP Sócio 2
        customfield_shorttext42: "", // Endereço Sócio 2
        customfield_shorttext57: "", // Número Sócio 2
        customfield_shorttext49: "", // Complemento Sócio 2
        customfield_shorttext58: "", // Bairro Sócio 2
        customfield_shorttext46: "", // Cidade Sócio 2
        customfield_shorttext59: "", // UF Sócio 2
        customfield_shorttext53: "", // País Sócio 2

        // Dados do Terceiro Sócio
        customfield_shorttext51: "", // Nome Completo Sócio 3
        customfield_shorttext31: "", // CPF Sócio 3
        customfield_shorttext56: "", // Email Sócio 3
        customfield_shorttext35: "", // Telefone Sócio 3
        customfield_date3: "", // Data Nascimento Sócio 3
        customfield_file9: "", // Atestado Antecedentes Criminais Sócio 3
        customfield_shorttext25: "", // CEP Sócio 3
        customfield_shorttext38: "", // Endereço Sócio 3
        customfield_shorttext30: "", // Número Sócio 3
        customfield_shorttext37: "", // Complemento Sócio 3
        customfield_shorttext28: "", // Bairro Sócio 3
        customfield_shorttext39: "", // Cidade Sócio 3
        customfield_shorttext33: "", // UF Sócio 3
        customfield_shorttext41: "", // País Sócio 3

        // Dados do Quarto Sócio
        customfield_shorttext44: "", // Nome Completo Sócio 4
        customfield_shorttext27: "", // CPF Sócio 4
        customfield_shorttext43: "", // Email Sócio 4
        customfield_shorttext26: "", // Telefone Sócio 4
        customfield_date4: "", // Data Nascimento Sócio 4
        customfield_file8: "", // Atestado Antecedentes Criminais Sócio 4
        customfield_shorttext45: "", // CEP Sócio 4
        customfield_shorttext29: "", // Endereço Sócio 4
        customfield_shorttext50: "", // Número Sócio 4
        customfield_shorttext34: "", // Complemento Sócio 4
        customfield_shorttext47: "", // Bairro Sócio 4
        customfield_shorttext32: "", // Cidade Sócio 4
        customfield_shorttext54: "", // UF Sócio 4
        customfield_shorttext36: "", // País Sócio 4

        // Documentos
        customfield_file0: "", // Contrato Social
        customfield_file1: "", // CND
        customfield_file2: "", // Conselho de Classe
        customfield_file3: "", // Dados Bancários
        customfield_file4: "", // Certificado Conselho de Classe
        customfield_file5: "", // Inscrição Municipal
      },
      errorMessage: "",
      successMessage: "",
      isSubmitting: false,
    };
  },
  computed: {
    currentStepProps() {
      return {
        formData: this.formData,
        index: this.currentStep >= 2 && this.currentStep < this.steps.length - 2 ? this.currentStep - 2 : null,
      };
    },

    // Adiciona computed property para formatar o JSON
    formattedJson() {
      // Remove campos vazios do formData e inclui informações dos arquivos
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

      // Adiciona informações dos arquivos do fileUploadManager
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
    handleNextStep(data) {
      console.log("Dados recebidos:", data);

      // Atualiza o formData mantendo os dados existentes
      const mappedData = this.mapStepDataToFields(data);
      this.formData = {
        ...this.formData,
        ...mappedData,
      };

      console.log("FormData atualizado:", this.formData);

      // Avança para o próximo passo
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
      }
    },
    handlePreviousStep() {
      if (this.currentStep > 0) {
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

        // Adiciona campos básicos obrigatórios
        formData.append("title", this.formData.title || "");
        formData.append("priority", this.formData.priority || "");
        formData.append("description", this.formData.description || "");
        formData.append("layout_id", "33662000000053045");

        // Adiciona campos de texto (exceto arquivos)
        Object.entries(this.formData).forEach(([key, value]) => {
          if (value && !(value instanceof File) && !["title", "priority", "description", "layout_id"].includes(key)) {
            formData.append(key, String(value));
          }
        });

        // Adiciona arquivos do fileUploadManager
        const files = fileUploadManager.getAllFiles();
        Object.entries(files).forEach(([key, file]) => {
          if (file instanceof File) {
            // Importante: Use o nome do arquivo como terceiro parâmetro
            formData.append(key, file, file.name);
          }
        });

        const response = await api.post("/cards", formData);

        if (response.status === 201 || response.status === 200) {
          this.successMessage = "Formulário enviado com sucesso!";
        } else {
          throw new Error(`Erro ${response.status}: ${response.data.message || "Erro desconhecido"}`);
        }
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        this.errorMessage = error.response?.data?.message || error.message || "Erro ao enviar formulário";
      } finally {
        this.isSubmitting = false;
      }
    },
    setupSteps() {
      // Reseta os steps básicos
      this.steps = [
        { title: "Detalhes", component: StepDetails },
        { title: "Empresa", component: StepCompany },
      ];

      // Adiciona steps para cada sócio baseado na quantidade selecionada
      for (let i = 1; i <= this.socioCount; i++) {
        this.steps.push({
          title: `Sócio ${i}`,
          component: StepAdmin,
        });
      }

      // Adiciona o step de documentos e resumo
      this.steps.push({ title: "Documentos", component: StepDocuments }, { title: "Resumo", component: null });
    },
    mapStepDataToFields(data) {
      switch (this.currentStep) {
        case 0: // StepDetails
          return {
            title: data.title || "",
            priority: data.priority || "",
            customfield_integer2: data.numberOfPartners || "",
            description: data.description || "",
          };

        case 1: // StepCompany
          return {
            customfield_shorttext20: data.cnpj || "", // CNPJ
            customfield_shorttext17: data.razaoSocial || "", // Razao Social
            customfield_shorttext1: data.nomeFantasia || "", // Nome Fantasia
            customfield_shorttext19: data.email || "", // Email
            customfield_longtext1: data.atividadePrincipal || "", // Atividade Principal
            customfield_shorttext16: data.telefone || "", // Telefone
            customfield_date2: data.dataAbertura
              ? new Date(data.dataAbertura)
                  .toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(/\//g, "-")
                  .replace(",", "")
              : "", // Data de Abertura
            customfield_shorttext18: data.cep || "", // CEP
            customfield_shorttext23: data.endereco || "", // Endereco
            customfield_integer1: data.numero || "", // Numero
            customfield_shorttext15: data.complemento || "", // Complemento
            customfield_shorttext11: data.bairro || "", // Bairro
            customfield_shorttext24: data.cidade || "", // Cidade
            customfield_shorttext6: data.uf || "", // UF
            customfield_shorttext9: data.pais || "", // Pais
          };

        case 2: // Primeiro Sócio
          return {
            customfield_shorttext21: data.nome || "", // Nome Completo
            customfield_shorttext22: data.cpf || "", // CPF
            customfield_shorttext14: data.email || "", // Email
            customfield_shorttext13: data.telefone || "", // Telefone
            customfield_date1: data.dataNascimento
              ? new Date(data.dataNascimento)
                  .toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(/\//g, "-")
                  .replace(",", "")
              : "", // Data Nascimento
            customfield_shorttext2: data.cep || "", // CEP
            customfield_shorttext4: data.endereco || "", // Endereço
            customfield_shorttext3: data.numero || "", // Número
            customfield_shorttext12: data.complemento || "", // Complemento
            customfield_shorttext5: data.bairro || "", // Bairro
            customfield_shorttext8: data.cidade || "", // Cidade
            customfield_shorttext7: data.uf || "", // UF
            customfield_shorttext10: data.pais || "", // País
          };

        case 3: // Segundo Sócio
          return {
            customfield_shorttext48: data.nome || "", // Nome Completo Socio 2
            customfield_shorttext60: data.cpf || "", // CPF Socio 2
            customfield_shorttext52: data.email || "", // Email Socio 2
            customfield_shorttext40: data.telefone || "", // Telefone Socio 2
            customfield_date5: data.dataNascimento
              ? new Date(data.dataNascimento)
                  .toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(/\//g, "-")
                  .replace(",", "")
              : "", // Data Nascimento Socio 2
            customfield_file10: data.atestadoAntecedentes || "", // Atestado Antecedentes Socio 2
            customfield_shorttext55: data.cep || "", // CEP Socio 2
            customfield_shorttext42: data.endereco || "", // Endereco Socio 2
            customfield_shorttext57: data.numero || "", // Numero Socio 2
            customfield_shorttext49: data.complemento || "", // Complemento Socio 2
            customfield_shorttext58: data.bairro || "", // Bairro Socio 2
            customfield_shorttext46: data.cidade || "", // Cidade Socio 2
            customfield_shorttext59: data.uf || "", // UF Socio 2
            customfield_shorttext53: data.pais || "", // Pais Socio 2
          };

        case 4: // Terceiro Sócio
          return {
            customfield_shorttext51: data.nome || "", // Nome Completo
            customfield_shorttext31: data.cpf || "", // CPF
            customfield_shorttext56: data.email || "", // Email
            customfield_shorttext35: data.telefone || "", // Telefone
            customfield_date3: data.dataNascimento
              ? new Date(data.dataNascimento)
                  .toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(/\//g, "-")
                  .replace(",", "")
              : "", // Data Nascimento Socio 3
            customfield_file9: data.atestadoAntecedentes || "", // Atestado Antecedentes
            customfield_shorttext25: data.cep || "", // CEP
            customfield_shorttext38: data.endereco || "", // Endereco
            customfield_shorttext30: data.numero || "", // Numero
            customfield_shorttext37: data.complemento || "", // Complemento
            customfield_shorttext28: data.bairro || "", // Bairro
            customfield_shorttext39: data.cidade || "", // Cidade
            customfield_shorttext33: data.uf || "", // UF
            customfield_shorttext41: data.pais || "", // Pais
          };

        case 5: // Quarto Sócio
          return {
            customfield_shorttext44: data.nome || "", // Nome Completo
            customfield_shorttext27: data.cpf || "", // CPF
            customfield_shorttext43: data.email || "", // Email
            customfield_shorttext26: data.telefone || "", // Telefone
            customfield_date4: data.dataNascimento
              ? new Date(data.dataNascimento)
                  .toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(/\//g, "-")
                  .replace(",", "")
              : "", // Data Nascimento Socio 4
            customfield_file8: data.atestadoAntecedentes || "", // Atestado Antecedentes
            customfield_shorttext45: data.cep || "", // CEP
            customfield_shorttext29: data.endereco || "", // Endereco
            customfield_shorttext50: data.numero || "", // Numero
            customfield_shorttext34: data.complemento || "", // Complemento
            customfield_shorttext47: data.bairro || "", // Bairro
            customfield_shorttext32: data.cidade || "", // Cidade
            customfield_shorttext54: data.uf || "", // UF
            customfield_shorttext36: data.pais || "", // Pais
          };

        default:
          return data;
      }
    },
    async prepareFormData() {
      try {
        const data = { ...this.formData };

        // Obtém todos os arquivos do fileUploadManager
        const files = fileUploadManager.getAllFiles();

        const preparedData = {
          // ... resto do código existente ...

          // Adiciona os arquivos ao preparedData
          ...Object.entries(files).reduce(
            (acc, [key, file]) => ({
              ...acc,
              [key]: {
                name: file.name,
                size: file.size,
                type: file.type,
              },
            }),
            {}
          ),
        };

        // Remove campos vazios
        const cleanedData = Object.fromEntries(
          Object.entries(preparedData).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
        );

        return cleanedData;
      } catch (error) {
        console.error("Erro ao preparar dados:", error);
        throw error;
      }
    },
    async createCard(cardData) {
      try {
        const response = await api.post("/cards", cardData);
        console.log("Resposta da API:", response.data);
        return response.data;
      } catch (error) {
        console.error("Erro detalhado:", error.response ? error.response.data : error);
        throw new Error("Erro ao criar card: " + error.message);
      }
    },
  },
  watch: {
    "formData.customfield_integer2": {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.socioCount = parseInt(newValue);
          this.setupSteps();
        }
      },
    },
  },
  mounted() {
    this.setupSteps();
  },
};
</script>
