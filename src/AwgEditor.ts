import * as monaco from 'monaco-editor'

import { CodeEditor, HoverParams, SuggestionsParams } from './type'
/**
 * 基于monaco-editor的二次封装，实现快速定义自定义提示和鼠标悬浮提示
 */
export class AwgEditor implements CodeEditor {
  /** @internal */
  private hoverMap: Map<string, monaco.IMarkdownString[]>
  private suggestion: monaco.IDisposable | null
  private hoverTips: monaco.IDisposable | null
  language: string
  static instance: AwgEditor
  /**
 * @ignore
 */
  constructor() {
    this.hoverMap = new Map()
    this.suggestion = null
    this.hoverTips = null
    this.language = 'python'
    this.defineTheme()
  }
  /**
   * 
   * @return(AwgEditor) 
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new AwgEditor()
    }
    return this.instance
  }


  /**
   * 
   * @param lan 设置编辑器语言
   */
  setLanguage(lan: string) {
    this.language = lan
  }
  /**
   * 自定义编辑器主题，默认使用AWG项目的主题
   */
  defineTheme() {
    // const {editor} = this.monaco
    monaco.editor.defineTheme('AWG', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#FFF',
        'editorGutter.background': '#f1f1f1',
        'editorLineNumber.foreground': '#333333',
        'editor.lineHighlightBorder': '#c6c6c6',
      },
    })
  }
  /**
 * @ignore
 */
  private createSuggestions(
    params: string[] | SuggestionsParams[],
    range: monaco.IRange
  ): monaco.languages.CompletionItem[] {
    if (Array.isArray(params)) {
      const tipsList: monaco.languages.CompletionItem[] = []
      params.forEach((item: string | SuggestionsParams) => {
        if (typeof item === 'string') {
          tipsList.push({
            label: item,
            insertText: item + '(' + ')',
            detail: item,
            range: range,
            kind: monaco.languages.CompletionItemKind.Function,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          })
        } else {
          tipsList.push({
            label: item.label,
            insertText: item.text,
            range: range,
            detail: item.detail,
            kind: monaco.languages.CompletionItemKind[item.kind],
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          })
        }
      })
      return tipsList
    } else {
      return []
    }
  }
  /**
   * 初始化自定义函数提示
   * @param params 自定义函数提示参数
   */
  initSuggestions(params: string[] | SuggestionsParams[]) {
    this.suggestion = monaco.languages.registerCompletionItemProvider(
      this.language,
      {
        provideCompletionItems: (model, position) => {
          const word = model.getWordAtPosition(position)
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word!.startColumn,
            endColumn: word!.endColumn,
          }
          return {
            incomplete: true,
            suggestions: this.createSuggestions(params, range),
          }
        },
      }
    )
  }
  /**
   * 初始化鼠标悬浮提示
   * @param params 自定义鼠标悬浮提示参数
   * @param formate 是否开启简单的提示格式化功能
   */
  initHover(params: HoverParams | HoverParams[], formate = true) {
    this.hover(params, formate)
    this.hoverTips = monaco.languages.registerHoverProvider(this.language, {
      provideHover: (model, position) => {
        const word = model.getWordAtPosition(position)?.word
        return {
          contents: this.hoverMap.get(word || '') || [{ value: '' }],
        }
      },
    })
  }

  /**
  * @ignore
  */
  private hover(params: HoverParams | HoverParams[], formate: boolean) {
    const formateFn = formate ? this.formateHover : (val: string) => val
    if (Array.isArray(params)) {
      params.forEach((item) => {
        const contents = [
          { value: item.type || 'method' },
          {
            value:
              '```' +
              this.language +
              '\n' +
              (formateFn(item.value) || '') +
              '\n```',
          },
        ]
        this.hoverMap.set(item.key, contents)
      })
    } else {
      const contents = [
        { value: params.type || 'method' },
        {
          value:
            '```' +
            this.language +
            '\n' +
            (formateFn(params.value) || '') +
            '\n```',
        },
      ]
      this.hoverMap.set(params.key, contents)
    }
  }

  /**
   * 提供简单的格式化鼠标悬浮提示的能力
   * @param txt 格式化文字
   * @returns 格式化后的文字
   */
  formateHover(txt: string) {
    if (!txt) return ''
    return txt.toString().split(',').join(',\n')
  }
  /**
   * 取消原有的自定义提示与鼠标悬浮提示
   */
  dispose() {
    this.suggestion && this.suggestion.dispose()
    this.hoverTips && this.hoverTips.dispose()
  }
  /**
   * 初始化编辑器
   * @param editorDom monaco-editor的dom容器
   * @returns monaco-editor create实例
   */
  initCodeEditor(editorDom: HTMLElement) {
    if (!editorDom) return null
    return monaco.editor.create(editorDom, {
      language: this.language,
      wrappingIndent: 'indent',
      fontSize: 14,
      folding: false,
      theme: 'AWG',
      lineNumbersMinChars: 2,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      lightbulb: {
        enabled: true,
      },
      parameterHints: {
        enabled: true,
      },
      suggest: {
        snippetsPreventQuickSuggestions: false,
      },
    })
  }
}