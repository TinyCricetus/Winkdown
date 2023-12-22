import { BaseElement } from "slate"

export interface Paragraph extends BaseElement {
  type: string
}

export interface ListElement extends BaseElement {
  type: string
  uuid: string
  indent: number
}