/**
 * Configurações do aplicativo
 */
export const APP_CONFIG = {
  version: '2.0',
  storageKeys: {
    processos: 'juristech_processos',
    clientes: 'juristech_clientes',
    transacoes: 'juristech_transacoes',
    documentos: 'juristech_documentos',
    audit: 'juristech_audit'
  }
}

/**
 * Utilitários gerais
 */
export const Utils = {
  generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
  
  formatCurrency: (value) => {
    if (!value) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value.toString().replace(/[^\d,.-]/g, '').replace(',', '.')))
  },
  
  formatDate: (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  },
  
  formatDateTime: (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR')
  },
  
  getProcessoStatus: (ultimoEvento) => {
    if (!ultimoEvento) return 'Em Andamento'
    const evento = ultimoEvento.toLowerCase()
    if (evento.includes('julgamento') || evento.includes('sentença')) return 'Julgamento'
    if (evento.includes('arquivado') || evento.includes('baixa')) return 'Arquivado'
    if (evento.includes('petição') || evento.includes('inicial')) return 'Petição'
    return 'Em Andamento'
  },
  
  getStatusColor: (status) => {
    const colors = {
      'Em Andamento': 'bg-blue-100 text-blue-800',
      'Julgamento': 'bg-yellow-100 text-yellow-800',
      'Arquivado': 'bg-gray-100 text-gray-800',
      'Petição': 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  },

  // Validação de CPF/CNPJ
  isValidCPF: (cpf) => {
    const cleaned = cpf.replace(/\D/g, '')
    if (cleaned.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleaned)) return false
    
    let sum = 0
    let remainder
    
    for (let i = 1; i <= 9; i++)
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false
    
    sum = 0
    for (let i = 1; i <= 10; i++)
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned.substring(10, 11))) return false
    
    return true
  },

  // Validação de email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

/**
 * Gerenciador de dados (LocalStorage)
 */
export const DataManager = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (e) {
      console.error('Erro ao salvar dados:', e)
      return false
    }
  },
  
  load: (key) => {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (e) {
      console.error('Erro ao carregar dados:', e)
      return []
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      console.error('Erro ao remover dados:', e)
      return false
    }
  },

  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (e) {
      console.error('Erro ao limpar dados:', e)
      return false
    }
  }
}

/**
 * Validar se dados são um array válido
 */
export const validateArray = (data) => {
  return Array.isArray(data) ? data : []
}

/**
 * Validar estrutura de backup
 */
export const validateBackupStructure = (backup) => {
  return backup &&
    typeof backup === 'object' &&
    backup.version &&
    backup.data &&
    typeof backup.data === 'object'
}

/**
 * Classe de validação de formulários
 */
export class FormValidator {
  constructor() {
    this.errors = {}
  }

  validate(formData, rules) {
    this.errors = {}

    Object.keys(rules).forEach(field => {
      const rule = rules[field]
      const value = formData[field]

      if (rule.required && !value) {
        this.errors[field] = `${rule.label} é obrigatório`
      } else if (rule.type === 'email' && value && !Utils.isValidEmail(value)) {
        this.errors[field] = 'Email inválido'
      } else if (rule.type === 'cpf' && value && !Utils.isValidCPF(value)) {
        this.errors[field] = 'CPF inválido'
      } else if (rule.minLength && value && value.length < rule.minLength) {
        this.errors[field] = `Mínimo ${rule.minLength} caracteres`
      } else if (rule.maxLength && value && value.length > rule.maxLength) {
        this.errors[field] = `Máximo ${rule.maxLength} caracteres`
      } else if (rule.pattern && value && !rule.pattern.test(value)) {
        this.errors[field] = rule.errorMessage || 'Formato inválido'
      }
    })

    return Object.keys(this.errors).length === 0
  }

  getErrors() {
    return this.errors
  }

  getError(field) {
    return this.errors[field]
  }

  hasError(field) {
    return !!this.errors[field]
  }
}

/**
 * Exportar de processos para CSV
 */
export const exportProcessosToCSV = (processos) => {
  if (processos.length === 0) {
    return null
  }

  const headers = [
    'Número Processo',
    'Classe',
    'Autores',
    'Réus',
    'Localidade',
    'Assunto',
    'Último Evento',
    'Data/Hora Evento',
    'Data Distribuição',
    'Valor da Causa'
  ]

  const rows = processos.map(p => [
    p.numero,
    p.classe,
    p.autores,
    p.reus,
    p.localidade,
    p.assunto,
    p.ultimoEvento,
    p.dataHoraEvento,
    p.dataDistribuicao,
    p.valorCausa
  ].map(field => `"${field || ''}"`))

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  return '\ufeff' + csv
}

/**
 * Importar processos de CSV
 */
export const importProcessosFromCSV = (csvText) => {
  const lines = csvText.split('\n')
  const processos = []

  // Pular cabeçalho
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = line.split(',').map(v => v.replace(/"/g, '').trim())
    if (values.length >= 10) {
      processos.push({
        numero: values[0],
        classe: values[1],
        autores: values[2],
        reus: values[3],
        localidade: values[4],
        assunto: values[5],
        ultimoEvento: values[6],
        dataHoraEvento: values[7],
        dataDistribuicao: values[8],
        valorCausa: values[9]
      })
    }
  }

  return processos
}

/**
 * Validar dados de processo antes de salvar
 */
export const validateProcessoData = (processo) => {
  const required = ['numero', 'classe', 'autores', 'reus', 'assunto']
  return required.every(field => processo[field] && processo[field].trim() !== '')
}

/**
 * Constantes e Enums
 */

// Prioridades
export const PRIORIDADES = [
  { value: 'baixa', label: 'Baixa', color: 'bg-blue-100 text-blue-800' },
  { value: 'normal', label: 'Normal', color: 'bg-gray-100 text-gray-800' },
  { value: 'alta', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-800' }
]

// Status gerais
export const STATUS_OPCOES = [
  { value: 'pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmado', label: 'Confirmado', color: 'bg-green-100 text-green-800' },
  { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-800' },
  { value: 'concluido', label: 'Concluído', color: 'bg-blue-100 text-blue-800' }
]

// Status de Agenda/Eventos
export const AGENDA_STATUS = [
  { value: 'pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmado', label: 'Confirmado', color: 'bg-green-100 text-green-800' },
  { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-800' },
  { value: 'concluido', label: 'Concluído', color: 'bg-blue-100 text-blue-800' }
]

// Status Financeiro
export const FINANCEIRO_STATUS = [
  { value: 'pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'pago', label: 'Pago', color: 'bg-green-100 text-green-800' },
  { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-800' },
  { value: 'atrasado', label: 'Atrasado', color: 'bg-orange-100 text-orange-800' }
]

// Tipos de eventos
export const TIPOS_EVENTO = [
  'Audiência',
  'Prazo Processual',
  'Reunião',
  'Consulta',
  'Vencimento',
  'Outros'
]

// Categorias de Transações Financeiras
export const CATEGORIAS_TRANSACAO = {
  receita: [
    'Honorários',
    'Consultas',
    'Pareceres',
    'Contratos',
    'Outros Serviços'
  ],
  despesa: [
    'Custas Processuais',
    'Despesas Operacionais',
    'Salários',
    'Aluguel',
    'Tecnologia',
    'Marketing',
    'Impostos',
    'Outras Despesas'
  ]
}

// Formas de pagamento
export const FORMAS_PAGAMENTO = [
  'Dinheiro',
  'PIX',
  'Transferência Bancária',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Boleto',
  'Cheque'
]

// Categorias de Documentos
export const CATEGORIAS_DOCUMENTO = [
  'Petição',
  'Contrato',
  'Procuração',
  'Certidão',
  'Sentença',
  'Acórdão',
  'Parecer',
  'Comprovante',
  'Outros'
]

// Tipos de prioridade (aliases para compatibilidade)
export const PRIORIDADE_COLORS = {
  'baixa': 'bg-blue-100 text-blue-800',
  'normal': 'bg-gray-100 text-gray-800',
  'alta': 'bg-orange-100 text-orange-800',
  'urgente': 'bg-red-100 text-red-800'
}

/**
 * Função helper para obter cor de prioridade
 */
export const getPriorityColor = (priority) => {
  const prioridade = PRIORIDADES.find(p => p.value === priority)
  return prioridade?.color || 'bg-gray-100 text-gray-800'
}

/**
 * Função helper para obter cor de status
 */
export const getStatusColor = (status, module = 'general') => {
  let statusList = STATUS_OPCOES
  
  if (module === 'agenda') {
    statusList = AGENDA_STATUS
  } else if (module === 'financeiro') {
    statusList = FINANCEIRO_STATUS
  }
  
  const statusObj = statusList.find(s => s.value === status)
  return statusObj?.color || 'bg-gray-100 text-gray-800'
}

/**
 * Validação de data
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date)
}

/**
 * Validação de valor monetário
 */
export const isValidCurrency = (value) => {
  if (!value) return false
  const numValue = parseFloat(value.toString().replace(/[^\d,.-]/g, '').replace(',', '.'))
  return !isNaN(numValue) && numValue >= 0
}

/**
 * Validação de tipo de arquivo
 */
export const isValidFileType = (filename, allowedTypes = []) => {
  if (!filename) return false
  
  const ext = filename.split('.').pop()?.toLowerCase()
  
  // Se não há tipos permitidos especificados, aceita qualquer coisa
  if (allowedTypes.length === 0) return true
  
  return allowedTypes.includes(ext)
}

/**
 * Validação de tamanho de arquivo (em bytes)
 */
export const isValidFileSize = (size, maxSize = 10 * 1024 * 1024) => {
  return size && size <= maxSize
}
