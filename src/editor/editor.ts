import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { schema } from 'prosemirror-markdown'
import { exampleSetup } from 'prosemirror-example-setup'

export function createEditor(root: HTMLElement) {
  const state = EditorState.create({
    schema,
    plugins: exampleSetup({ schema })
    // [
    //   history(),
    //   keymap(baseKeymap),
    //   keymap({ "Mod-z": undo, "Mod-y": redo }),
    // ]
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