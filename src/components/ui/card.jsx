import React from 'react'

const CardBase = ({ children, className = '' }) => (
  <div className={`rounded-md bg-white shadow ${className}`}>{children}</div>
)

const CardContentBase = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
)

const CardHeaderBase = ({ children, className = '' }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
)

const CardTitleBase = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
)

const CardDescriptionBase = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
)

export const Card = React.memo(CardBase)
export const CardContent = React.memo(CardContentBase)
export const CardHeader = React.memo(CardHeaderBase)
export const CardTitle = React.memo(CardTitleBase)
export const CardDescription = React.memo(CardDescriptionBase)

export default Card
