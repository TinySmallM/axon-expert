import { Paths } from '../model'
import { FetchError } from './FetchError'

type Method = Paths['/productTypes']['method']
type MethodParams = Paths['/productTypes']['params']
type Path =  keyof Paths

export class Api {
  private root: string

  constructor() {
    this.root = 'http://localhost:8081'
  }

  public async doFetch(
    path: Path, 
    method: Method,
    params?: MethodParams 
  ): Promise<Paths['/productTypes']['response']> { 
    try {
      const result = await fetch(this.root + path, {
        method: method,
        body: params && JSON.stringify(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
  
      if (!result.ok) {
        const text = `api status ${result.status}`
        return Promise.reject(new FetchError('ServerError', text))
      }
      return result.json()
    }

    catch (error) {
      return Promise.reject(new FetchError('NetworkError', String(error)))
    }
  }
}
