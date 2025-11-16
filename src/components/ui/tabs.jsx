import React from 'react'

export const Tabs = ({ children, defaultValue, className = '' }) => (
  <div className={className}>{children}</div>
)

export const TabsList = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

export const TabsTrigger = ({ children, value }) => (
  <button data-value={value} className="px-2 py-1">{children}</button>
)

export const TabsContent = ({ children, value, className = '' }) => (
  <div className={className}>{children}</div>
)

export default Tabs
