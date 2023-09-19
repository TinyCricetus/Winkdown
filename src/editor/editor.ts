import { baseKeymap } from "prosemirror-commands"
import { undo, redo, history } from "prosemirror-history"
import { keymap } from "prosemirror-keymap"
import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"

export function createEditor(root: HTMLElement) {
  const state = EditorState.create({
    schema,
    plugins: [
      history(),
      keymap(baseKeymap),
      keymap({ "Mod-z": undo, "Mod-y": redo }),
    ]
  })

  const view = new EditorView(root, {
    state,
    dispatchTransaction(transaction) {
      console.log('Transaction: ', transaction)

      const newState = view.state.apply(transaction)
      view.updateState(newState)
    }
  })

  return view
}