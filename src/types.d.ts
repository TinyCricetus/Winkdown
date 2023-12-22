import { BaseEditor, BaseElement, BaseNode, BaseText } from "slate"
import { ReactEditor } from "slate-react"
import { Paragraph, ListElement } from "./constants"

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: Paragraph | ListElement
    Node: BaseNode
    Text: BaseText
  }
}