import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { FormValidator, Utils } from './utils.js'
import { CheckCircle } from 'lucide-react'

const VALIDATION_RULES = {
  nome: { required: true, label: 'Nome Completo', minLength: 3 },
  cpf: { required: true, label: 'CPF/CNPJ', type: 'cpf' },
  telefone: { required: true, label: 'Telefone', minLength: 10 },
  email: { required: false, label: 'Email', type: 'email' }
}

const INITIAL_FORM_STATE = {
  nome: '',
  cpf: '',
  telefone: '',
  email: '',
  endereco: ''
}

const ClienteModal = ({ open, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const validator = new FormValidator()

  useEffect(() => {
    if (!open) {
      setFormData(INITIAL_FORM_STATE)
      setErrors({})
    }
  }, [open])

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
      onSave(formData)
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha os campos para adicionar um novo cliente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">Nome</Label>
              <div className="col-span-3">
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={errors.nome ? 'border-red-500' : ''}
                  placeholder="Nome completo"
                />
                {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cpf" className="text-right">CPF</Label>
              <div className="col-span-3">
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className={errors.cpf ? 'border-red-500' : ''}
                  placeholder="000.000.000-00"
                />
                {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefone" className="text-right">Telefone</Label>
              <div className="col-span-3">
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={errors.telefone ? 'border-red-500' : ''}
                  placeholder="(00) 00000-0000"
                />
                {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="cliente@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endereco" className="text-right">Endereço</Label>
              <div className="col-span-3">
                <Textarea
                  id="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Endereço completo (opcional)"
                  rows={2}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Salvando...' : 'Adicionar Cliente'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ClienteModal
