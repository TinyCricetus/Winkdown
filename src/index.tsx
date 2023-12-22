import { createRoot } from 'react-dom/client'
import { Winkdown } from './components/winkdown'

const root = createRoot(document.getElementById('app')!)
root.render(<Winkdown />)
