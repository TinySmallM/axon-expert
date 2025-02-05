import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux';
import { store } from './store/storage'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  /* We don't have access to useRouter in the new version yet. VLatest */

  <Provider store={store}>
    <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
</Provider>,
)
