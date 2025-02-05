import { Api } from "../root/Api"

export const useRoot = () => {
  const api = new Api()

  return {
    api
  }
}