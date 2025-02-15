import { Methods } from '../model'
import { FetchError } from './FetchError'

export type FetchOptions = {
  headers?: Record<string, string>
}

type MethodParams<Path extends keyof Methods, Method extends keyof Methods[Path]> =
  Methods[Path][Method] extends { params: infer P } ? P : {};

type MethodResponse<Path extends keyof Methods, Method extends keyof Methods[Path]> =
  Methods[Path][Method] extends { response: infer R } ? R : {};


export class Api {
  private root: string

  constructor() {
    this.root = 'http://localhost:8081'
  }

  public async doFetch<Path extends keyof Methods, Method extends keyof Methods[Path]>(
    path: Path, 
    method: Method,
    params?: MethodParams<Path, Method>,
    options: FetchOptions = {}
  ): Promise<MethodResponse<Path, Method>> { 
    try {
      const result = await fetch(this.root + path, {
        method: String(method),
        body: params && JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
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
