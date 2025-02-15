export type ProductCreateResponse = { 
  id: string
  packsNumber: number
  packageType: 'компрессия' | 'некомпрессия'
  isArchived: boolean
  description?: string
  createdAt: string
}
