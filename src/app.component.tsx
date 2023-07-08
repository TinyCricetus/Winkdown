import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { useEffect, useRef } from 'react'

import './app.component.css'

export function App() {
  const editorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap(baseKeymap),
        keymap({"Mod-z": undo, "Mod-y": redo}),
      ]
    })

    const view = new EditorView(editorRef.current!, {
      state,
      dispatchTransaction(transaction) {
        console.log('Transaction: ', transaction)

        const newState = view.state.apply(transaction)
        view.updateState(newState)
      }
    })
  }, [])

  return (
    <div
      className="winkdown-container"
      ref={editorRef}>
    </div>
  )
}