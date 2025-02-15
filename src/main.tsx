import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import { Provider } from 'react-redux'
import { store } from './store/init'
import { App } from './App'
import { ProductTable } from './ui/ProductTable/ProductTable/ProductTable'
import { FormContainer } from './ui/ProductTable/FormContainer/FormContainer'
import './styles.css'
import { PATHS } from './utils/constants'

createRoot(document.getElementById('root')!).render(
  /* We don't have access to useRouter in the new version yet. VLatest */

  <Provider store={store}>
    <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<ProductTable />} />
          <Route path={PATHS.create} element={<FormContainer kind='create' />} />
          <Route path={PATHS.update} element={<FormContainer kind='update' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
</Provider>
)
