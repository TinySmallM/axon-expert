export type Products = {
  id: string
  packsNumber: number
  packageType: 'компрессия' | 'некомпрессия'
  isArchived: boolean
  description?: string
  createdAt: string
}


export type FormValue = {
  packsNumber: string
  packageType: 'компрессия' | 'некомпрессия'
  isArchived: boolean
  description: string
}

export type statusProduct = 'loading' | 'done' | 'error'