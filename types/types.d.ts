import {editor,languages} from 'monaco-editor'
export interface CodeEditor {
    language:string
    setLanguage:(lan:string)=>void
    defineTheme:()=>void
    initSuggestions:(params:string[]|SuggestionsParams[]) => void
    initHover:(params:HoverParams|HoverParams[],formate?:boolean)=>void
    dispose:()=>void
    initCodeEditor:(dom:HTMLElement)=>editor.IStandaloneCodeEditor | null
  }

  export interface SuggestionsParams {
    label:string
    text:string,
    detail:string
    kind:keyof typeof languages.CompletionItemKind
  }
  interface HoverParams {
    type:string
    value:string
    key:string
  }
 
  export class AwgEditor {
    static instance:AwgEditor
    language:string
    setLanguage:(lan:string)=>void
    defineTheme:()=>void
    initSuggestions:(params:string[]|SuggestionsParams[]) => void
    initHover:(params:HoverParams|HoverParams[],formate?:boolean)=>void
    dispose:()=>void
    static getInstance: () => AwgEditor
  }