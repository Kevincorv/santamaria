import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { TourismWhatsAppButton } from './components/ui/whatsapp-tourist'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <TourismWhatsAppButton />
    </>
  )
}

export default App