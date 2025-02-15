export type ProductUpdateParams = {
  packsNumber: number
  packageType: 'компрессия' | 'некомпрессия'
  isArchived: boolean
  description?: string
}

export type Payload = {
  id: string | false | null;
  params: ProductUpdateParams;
}