### 基于monaco-editor简单的二次封装
**类的主要功能为：提供快速创建自定义代码提示与鼠标悬浮提示**
<br/>

#### Api:


api | 描述 | 参数 | 返回值
---|---| ---| ---
getInstance | 类的静态方法，用来获取实例，不要使用new方法去创建实例，使用getInstance保持单例调 | |AwgEditor
initSuggestions | 实例方法用来创建代码补全提示 |params :string[]\|SuggestionsParams[] 代码补全提示参数 | void
initHover | 实例方法用来创建鼠标悬浮提示 | params: HoverParams]\|HoverParams[]   hover提示参数，formate:boolean 是否开启简单的格式化提示，默认值true| void
dispose | 实例方法用来销毁上一次创建的提示，用于存在多次调用提示的情况 | | void

#### type：
```
SuggestionsParams：{
    
    label:string 用户输入配置字符
    text:string 补全内容
    detail:string 提示描述
    kind:'KeyWord' | 'Function '| 'Snippet' 提示类型
}

HoverParams： {
    type：string 提示类型,默认method
    value：string 提示内容
    key：悬浮关键词
}
```


#### 使用：

```javascript
import { MonacoCodeEditor } from './editorTools/CodeEditor'
const dom = document.querySelector('#container')
const editor = MonacoCodeEditor.getInstance()
editor.initSuggestions(funName) // 创建代码补全提示
editor.initHover(hoverHints) // 创建鼠标悬浮提示
editor.initCodeEditor(dom) // 初始化编辑器
```

注：在vue中不建议在组件mounted创建提示，这样可以避免多次创建提示