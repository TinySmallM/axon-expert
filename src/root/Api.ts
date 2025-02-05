import { Paths } from '../model'

type Method = Paths['/productTypes']['method']
type MethodParams = Paths['/productTypes']['params']
type Path =  keyof Paths

export class Api {
  public async doFetch(
    path: Path, 
    method: Method,
    params: MethodParams = {} 
  ): Promise<Paths['/productTypes']['response']> { 
    try {
      const result = await fetch(path, {
        method: method,
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
  
      if (!result.ok) {
        const text = `api status ${result.status}`
        return Promise.reject({'ServerError': text})
      }
      return result.json()
    }

    catch (error) {
      return Promise.reject({'NetworkError': error})
    }
  }
}
