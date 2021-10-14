import  { IDisposable, editor, languages, IRange, IMarkdownString } from 'monaco-editor'
import { CodeEditor, HoverParams, SuggestionsParams } from './type'
export class MonacoCodeEditor implements CodeEditor {
  private hoverMap:Map<string, IMarkdownString[]>
  private suggestion:IDisposable | null
  private hoverTips:IDisposable | null
  language:string
  static instance:MonacoCodeEditor
  constructor () {
    this.hoverMap = new Map()
    this.suggestion = null
    this.hoverTips = null
    this.language = 'python'
    this.defineTheme()
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new MonacoCodeEditor()
    }
    return this.instance
  }


  setLanguage (lan:string) {
    this.language = lan
  }

  defineTheme () {
    // const {editor} = this.monaco
    editor.defineTheme('AWG', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#FFF',
        'editorGutter.background': '#f1f1f1',
        'editorLineNumber.foreground': '#333333',
        'editor.lineHighlightBorder': '#c6c6c6'
      }
    })
  }

  private createSuggestions (params:string[]|SuggestionsParams[], range:IRange):languages.CompletionItem[] {
    if (Array.isArray(params)) {
      const tipsList:languages.CompletionItem[] = []
      params.forEach((item:string|SuggestionsParams) => {
        if (typeof item === 'string') {
          tipsList.push({
            label: item,
            insertText: item + '(' + ')',
            detail: item,
            range: range,
            kind: languages.CompletionItemKind.Function,
            insertTextRules:
              languages.CompletionItemInsertTextRule.InsertAsSnippet
          })
        } else {
          tipsList.push({
            label: item.label,
            insertText: item.text,
            range: range,
            detail: item.detail,
            kind: languages.CompletionItemKind[item.kind],
            insertTextRules:
              languages.CompletionItemInsertTextRule.InsertAsSnippet
          })
        }
      })
      return tipsList
    } else {
      return []
    }
  }
  initSuggestions (params:string[]|SuggestionsParams[]) {
    this.suggestion = languages.registerCompletionItemProvider(
      this.language,
      {
        provideCompletionItems: (model, position) => {
          const word = model.getWordAtPosition(position)
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word!.startColumn,
            endColumn: word!.endColumn
          }
          return {
            incomplete: true,
            suggestions: this.createSuggestions(params, range)
          }
        }
      }
    )
  }

  initHover (params:HoverParams|HoverParams[], formate = true) {
    this.hover(params, formate)
    this.hoverTips = languages.registerHoverProvider(this.language, {
      provideHover: (model, position) => {
        const word = model.getWordAtPosition(position)?.word
        return {
          contents: this.hoverMap.get(word || '') || [{ value: '' }]
        }
      }
    })
  }

  private hover (params:HoverParams|HoverParams[], formate:boolean) {
    const formateFn = formate ? this.formateHover : (val:string) => val
    if (Array.isArray(params)) {
      params.forEach(item => {
        const contents = [
          { value: item.type || 'method' },
          { value: '```' + this.language + '\n' + (formateFn(item.value) || '') + '\n```' }
        ]
        this.hoverMap.set(item.key, contents)
      })
    } else {
      const contents = [
        { value: params.type || 'method' },
        { value: '```' + this.language + '\n' + (formateFn(params.value) || '') + '\n```' }
      ]
      this.hoverMap.set(params.key, contents)
    }
  }

  // 提供简单的格式化提示能力
  formateHover (txt:string) {
    if (!txt) return ''
    return txt.toString().split(',').join(',\n')
  }

  dispose () {
    this.suggestion && this.suggestion.dispose()
    this.hoverTips && this.hoverTips.dispose()
  }

  initCodeEditor (editorDom:HTMLElement) {
    if (!editorDom) return null
    return editor.create(editorDom, {
      language: this.language,
      wrappingIndent: 'indent',
      fontSize: 14,
      folding: false,
      theme: 'AWG',
      lineNumbersMinChars: 2,
      automaticLayout: true,
      minimap: {
        enabled: false
      },
      lightbulb: {
        enabled: true
      },
      parameterHints: {
        enabled: true
      },
      suggest: {
        snippetsPreventQuickSuggestions: false
      }
    })
  }
}
