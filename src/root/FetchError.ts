export class FetchError {
  constructor(public kind: 'ServerError' | 'NetworkError', public text: string) {}
}