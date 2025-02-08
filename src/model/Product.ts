export type Products = {
  id: string
  packsNumber: number
  packageType: 'compression' | 'noCompression'
  isArchived: boolean
  description?: string
  createdAt: string
}