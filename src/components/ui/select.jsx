import React from 'react'

export const Select = ({ children, value, onValueChange }) => (
  <div>{children}</div>
)

export const SelectTrigger = ({ children, className = '' }) => (
  <div className={`border rounded-md p-2 ${className}`}>{children}</div>
)

export const SelectValue = ({ placeholder }) => (
  <span>{placeholder}</span>
)

export const SelectContent = ({ children }) => <div>{children}</div>
export const SelectItem = ({ children, value }) => <div data-value={value}>{children}</div>

export default Select
