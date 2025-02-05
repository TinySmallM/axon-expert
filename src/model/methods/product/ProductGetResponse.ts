export type ProductGetResponse = { 
  id: string
  packsNumber: number
  packageType: 'compression' | 'noCompression'
  isArchived: boolean
  description?: string
  createdAt: Date
}