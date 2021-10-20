import * as monaco from 'monaco-editor'
export interface CodeEditor {
  language: string
  setLanguage: (lan: string) => void
  defineTheme: () => void
  initSuggestions: (params: string[] | SuggestionsParams[]) => void
  initHover: (params: HoverParams | HoverParams[], formate?: boolean) => void
  dispose: () => void
  initCodeEditor: (
    dom: HTMLElement
  ) => monaco.editor.IStandaloneCodeEditor | null
}
export interface SuggestionsParams {
  label: string
  text: string
  detail: string
  kind: keyof typeof monaco.languages.CompletionItemKind
}
export interface HoverParams {
  type: string
  value: string
  key: string
}