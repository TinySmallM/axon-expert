export type ProductCreateParams = { 
  packsNumber: number
  packageType: 'компрессия' | 'некомпрессия'
  isArchived: boolean
  description?: string
}
