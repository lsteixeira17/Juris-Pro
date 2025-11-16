import React from 'react'

export const Dialog = ({ children, open = false, onOpenChange = () => {} }) => (
  open ? <div className="fixed inset-0 flex items-center justify-center z-50">{children}</div> : null
)

export const DialogContent = ({ children, className = '' }) => (
  <div className={`bg-white rounded-md shadow p-4 max-h-[90vh] overflow-auto ${className}`}>{children}</div>
)

export const DialogHeader = ({ children }) => <div className="mb-2">{children}</div>
export const DialogTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>
export const DialogDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>
export const DialogFooter = ({ children, className = '' }) => <div className={`mt-4 flex items-center justify-end ${className}`}>{children}</div>

export default Dialog
