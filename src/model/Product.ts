export type Product = {
  id: string
  packsNumber: number
  packageType: 'компрессия' | 'некомпрессия'
  isArchived: boolean
  description?: string
  createdAt: string
}

export type Products = {} & Product


export type FormValue = {
  packsNumber: string
  packageType: 'компрессия' | 'некомпрессия'
  isArchived: boolean
  description: string
}

export type ProductStatus = 'loading' | 'done' | 'error' | null