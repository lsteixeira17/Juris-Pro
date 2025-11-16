import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { FormValidator } from './utils.js'
import { CheckCircle } from 'lucide-react'

const CLASSE_OPTIONS = [
  { value: '', label: 'Selecione a classe' },
  { value: 'Ação Civil Pública', label: 'Ação Civil Pública' },
  { value: 'Ação de Cobrança', label: 'Ação de Cobrança' },
  { value: 'Ação de Indenização', label: 'Ação de Indenização' },
  { value: 'Mandado de Segurança', label: 'Mandado de Segurança' },
  { value: 'Procedimento Comum', label: 'Procedimento Comum' }
]

const VALIDATION_RULES = {
  numero: { required: true, label: 'Número do Processo', minLength: 3 },
  classe: { required: true, label: 'Classe' },
  autores: { required: true, label: 'Autor(es)', minLength: 3 },
  reus: { required: true, label: 'Réu(s)', minLength: 3 },
  localidade: { required: true, label: 'Localidade', minLength: 2 },
  assunto: { required: true, label: 'Assunto', minLength: 5 },
  ultimoEvento: { required: true, label: 'Último Evento', minLength: 5 },
  dataDistribuicao: { required: true, label: 'Data de Distribuição' }
}

const INITIAL_FORM_STATE = {
  numero: '',
  classe: '',
  autores: '',
  reus: '',
  localidade: '',
  assunto: '',
  ultimoEvento: '',
  dataHoraEvento: '',
  dataDistribuicao: '',
  valorCausa: ''
}

const ProcessoModal = ({ open, onOpenChange, processo, onSave, onCancel }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const validator = new FormValidator()

  useEffect(() => {
    if (processo) {
      setFormData({
        numero: processo.numero || '',
        classe: processo.classe || '',
        autores: processo.autores || '',
        reus: processo.reus || '',
        localidade: processo.localidade || '',
        assunto: processo.assunto || '',
        ultimoEvento: processo.ultimoEvento || '',
        dataHoraEvento: processo.dataHoraEvento || '',
        dataDistribuicao: processo.dataDistribuicao || '',
        valorCausa: processo.valorCausa || ''
      })
      setErrors({})
    } else {
      setFormData(INITIAL_FORM_STATE)
      setErrors({})
    }
  }, [processo, open])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    // Limpar erro do campo ao editar
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    setIsSubmitting(true)

    // Validar formulário
    if (!validator.validate(formData, VALIDATION_RULES)) {
      setErrors(validator.getErrors())
      setIsSubmitting(false)
      return
    }

    try {
      if (processo) {
        onSave(processo.id, formData)
      } else {
        onSave(formData)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{processo ? 'Editar Processo' : 'Novo Processo'}</DialogTitle>
          <DialogDescription>
            {processo ? 'Edite os detalhes do processo existente.' : 'Preencha os campos para adicionar um novo processo.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numero" className="text-right">Número</Label>
              <div className="col-span-3">
                <Input
                  id="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className={errors.numero ? 'border-red-500' : ''}
                  placeholder="0000000-00.0000.0.00.0000"
                />
                {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classe" className="text-right">Classe</Label>
              <div className="col-span-3">
                <select
                  id="classe"
                  value={formData.classe}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.classe ? 'border-red-500' : 'border-gray-300'}`}
                >
                  {CLASSE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.classe && <p className="text-red-500 text-sm mt-1">{errors.classe}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="autores" className="text-right">Autores</Label>
              <div className="col-span-3">
                <Textarea
                  id="autores"
                  value={formData.autores}
                  onChange={handleChange}
                  className={errors.autores ? 'border-red-500' : ''}
                  placeholder="Nome(s) do(s) autor(es)"
                  rows={2}
                />
                {errors.autores && <p className="text-red-500 text-sm mt-1">{errors.autores}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reus" className="text-right">Réus</Label>
              <div className="col-span-3">
                <Textarea
                  id="reus"
                  value={formData.reus}
                  onChange={handleChange}
                  className={errors.reus ? 'border-red-500' : ''}
                  placeholder="Nome(s) do(s) réu(s)"
                  rows={2}
                />
                {errors.reus && <p className="text-red-500 text-sm mt-1">{errors.reus}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="localidade" className="text-right">Localidade</Label>
              <div className="col-span-3">
                <Input
                  id="localidade"
                  value={formData.localidade}
                  onChange={handleChange}
                  className={errors.localidade ? 'border-red-500' : ''}
                  placeholder="Ex: São Paulo/SP"
                />
                {errors.localidade && <p className="text-red-500 text-sm mt-1">{errors.localidade}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valorCausa" className="text-right">Valor da Causa</Label>
              <div className="col-span-3">
                <Input
                  id="valorCausa"
                  value={formData.valorCausa}
                  onChange={handleChange}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assunto" className="text-right">Assunto</Label>
              <div className="col-span-3">
                <Textarea
                  id="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  className={errors.assunto ? 'border-red-500' : ''}
                  placeholder="Assunto principal do processo"
                  rows={3}
                />
                {errors.assunto && <p className="text-red-500 text-sm mt-1">{errors.assunto}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ultimoEvento" className="text-right">Último Evento</Label>
              <div className="col-span-3">
                <Textarea
                  id="ultimoEvento"
                  value={formData.ultimoEvento}
                  onChange={handleChange}
                  className={errors.ultimoEvento ? 'border-red-500' : ''}
                  placeholder="Descrição do último evento processual"
                  rows={3}
                />
                {errors.ultimoEvento && <p className="text-red-500 text-sm mt-1">{errors.ultimoEvento}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataHoraEvento" className="text-right">Data/Hora Evento</Label>
              <div className="col-span-3">
                <Input
                  id="dataHoraEvento"
                  type="datetime-local"
                  value={formData.dataHoraEvento}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dataDistribuicao" className="text-right">Data Distribuição</Label>
              <div className="col-span-3">
                <Input
                  id="dataDistribuicao"
                  type="date"
                  value={formData.dataDistribuicao}
                  onChange={handleChange}
                  className={errors.dataDistribuicao ? 'border-red-500' : ''}
                />
                {errors.dataDistribuicao && <p className="text-red-500 text-sm mt-1">{errors.dataDistribuicao}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Salvando...' : (processo ? 'Salvar Alterações' : 'Adicionar Processo')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProcessoModal
