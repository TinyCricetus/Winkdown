import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div>This is a prosemirror editor</div>
  )
}

const root = createRoot(document.getElementById('app')!)
root.render(<App />)
