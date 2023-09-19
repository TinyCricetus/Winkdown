import { useEffect, useRef } from 'react'
import { createEditor } from './editor'

import './app.css'
import './assets/css/prose-mirror.css'

export function App() {
  const editorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    const editor = createEditor(editorRef.current)

    return () => {
      editor.destroy()
    }
  }, [])

  return (
    <div className="winkdown-container">
      <div ref={editorRef} className="winkdown"></div>
    </div>
  )
}