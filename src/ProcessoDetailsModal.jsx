import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Edit, Copy, Trash2 } from 'lucide-react'
import { Utils } from './utils.js'

const ProcessoDetailsModal = ({ open, onOpenChange, processo, onEdit, onDuplicate, onDelete }) => {
  if (!processo) return null

  const status = Utils.getProcessoStatus(processo.ultimoEvento)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Processo</DialogTitle>
          <DialogDescription>
            {processo.numero}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="gestao" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="gestao">Gestão</TabsTrigger>
            <TabsTrigger value="prazos">Prazos</TabsTrigger>
            <TabsTrigger value="documentos">Docs</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gestao" className="space-y-4">
            <div className="grid gap-4 py-4 text-sm">
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Número:</span>
                <span className="text-gray-900">{processo.numero}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Classe:</span>
                <span className="text-gray-900">{processo.classe}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Autor(es):</span>
                <span className="text-gray-900">{processo.autores}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Réu(s):</span>
                <span className="text-gray-900">{processo.reus}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Localidade:</span>
                <span className="text-gray-900">{processo.localidade}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Assunto:</span>
                <span className="text-gray-900">{processo.assunto}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Status:</span>
                <Badge className={Utils.getStatusColor(status)}>{status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="font-semibold text-gray-700">Valor da Causa:</span>
                <span className="text-gray-900">{Utils.formatCurrency(processo.valorCausa)}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prazos" className="py-4">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Nenhum prazo cadastrado</p>
                <Button variant="outline" size="sm">Adicionar Prazo</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documentos" className="py-4">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Nenhum documento anexado</p>
                <Button variant="outline" size="sm">Anexar Documento</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="financeiro" className="py-4">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Nenhum lançamento financeiro</p>
                <Button variant="outline" size="sm">Adicionar Lançamento</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="historico" className="py-4">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <p className="text-xs text-gray-500 font-medium">Sistema</p>
                <p className="text-sm text-gray-700">Processo criado</p>
                <p className="text-xs text-gray-400">{Utils.formatDate(processo.createdAt)}</p>
              </div>
              {processo.updatedAt && processo.updatedAt !== processo.createdAt && (
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                  <p className="text-xs text-gray-500 font-medium">Sistema</p>
                  <p className="text-sm text-gray-700">Processo atualizado</p>
                  <p className="text-xs text-gray-400">{Utils.formatDate(processo.updatedAt)}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between pt-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(processo)}>
              <Edit className="h-3 w-3 mr-2" /> Editar
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDuplicate(processo)}>
              <Copy className="h-3 w-3 mr-2" /> Duplicar
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={() => onDelete(processo.id)}>
            <Trash2 className="h-3 w-3 mr-2" /> Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProcessoDetailsModal
