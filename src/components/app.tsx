import { useMemo, KeyboardEvent } from 'react'
import './app.css'
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react'
import { Descendant, Editor, Element, Transforms, createEditor } from 'slate'
import { ListElement } from '../constants'


const initValue: Descendant[] = new Array(10).fill(0).map((_, index) => {
  return {
    type: 'order-list',
    indent: 0,
    uuid: generateUuid(),
    children: [{ text: '我是一个列表项' }]
  }
})

function generateUuid() {
  return Math.random().toString()
}

function renderElement(props: RenderElementProps) {
  const { attributes, children, element } = props
  const { type } = element

  if (type === 'order-list') {
    return <ListElement {...props}></ListElement>
  }

  return (
    <p {...attributes}>{children}</p>
  )
}

function ListElement(props: RenderElementProps) {
  const { attributes, children, element } = props
  const { indent } = element as ListElement

  return (
    <div {...attributes} className="list-item">
      <div className="order">序号</div>
      <div style={{ marginLeft: `${indent * 1.3}em` }}>{children}</div>
    </div>
  )
}

export function App() {
  const editor = useMemo(() => withReact(createEditor()), [])

  function onKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'tab') {
      event.preventDefault()

      const [match] = Editor.nodes(editor, {
        match: node => {
          return (
            Element.isElement(node) &&
            node.type === 'order-list'
          )
        }
      })

      if (!match) {
        return
      }

      const node = match[0] as ListElement
      let indent = node.indent
      if (event.shiftKey) {
        indent = Math.max(0, indent - 1)
      } else {
        indent++
      }

      Transforms.setNodes(editor, {
        indent
      })
    }
  }

  return (
    <div className="winkdown-container">
      <Slate
        editor={editor}
        initialValue={initValue}
      >
        <Editable
          renderElement={renderElement}
          className='winkdown'
          onKeyDown={onKeyDown}
        />
      </Slate>
    </div>
  )
}