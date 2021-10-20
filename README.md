# awg-code-editor


## 🚄 使用教程

### 安装

```bash
  npm i install awg-code-editor or yarn add awg-code-editor
```

### 使用

```ts
import { AwgEditor } from 'awg-code-editor'
const editor = AwgEditor.getInstance()
AwgEditor.initSuggestions(funName) // 创建代码补全提示
AwgEditor.initHover(hoverHints) // 创建鼠标悬浮提示
AwgEditor.initCodeEditor(dom) // 初始化编辑器

```

### 📖 文档


# Class: AwgEditor

基于monaco-editor的二次封装，实现快速定义自定义提示和鼠标悬浮提示

## Implements

- `CodeEditor`

## Table of contents

### Properties

- [hoverMap](AwgEditor.md#hovermap)
- [hoverTips](AwgEditor.md#hovertips)
- [language](AwgEditor.md#language)
- [suggestion](AwgEditor.md#suggestion)
- [instance](AwgEditor.md#instance)

### Methods

- [defineTheme](AwgEditor.md#definetheme)
- [dispose](AwgEditor.md#dispose)
- [formateHover](AwgEditor.md#formatehover)
- [initCodeEditor](AwgEditor.md#initcodeeditor)
- [initHover](AwgEditor.md#inithover)
- [initSuggestions](AwgEditor.md#initsuggestions)
- [setLanguage](AwgEditor.md#setlanguage)
- [getInstance](AwgEditor.md#getinstance)

## Properties

### hoverMap

• `Private` **hoverMap**: `Map`<`string`, `IMarkdownString`[]\>

**`internal`**

#### Defined in

[AwgEditor.ts:9](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L9)

___

### hoverTips

• `Private` **hoverTips**: ``null`` \| `IDisposable`

#### Defined in

[AwgEditor.ts:11](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L11)

___

### language

• **language**: `string`

#### Implementation of

CodeEditor.language

#### Defined in

[AwgEditor.ts:12](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L12)

___

### suggestion

• `Private` **suggestion**: ``null`` \| `IDisposable`

#### Defined in

[AwgEditor.ts:10](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L10)

___

### instance

▪ `Static` **instance**: [`AwgEditor`](AwgEditor.md)

#### Defined in

[AwgEditor.ts:13](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L13)

## Methods

### defineTheme

▸ **defineTheme**(): `void`

自定义编辑器主题，默认使用AWG项目的主题

#### Returns

`void`

#### Implementation of

CodeEditor.defineTheme

#### Defined in

[AwgEditor.ts:46](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L46)

___

### dispose

▸ **dispose**(): `void`

取消原有的自定义提示与鼠标悬浮提示

#### Returns

`void`

#### Implementation of

CodeEditor.dispose

#### Defined in

[AwgEditor.ts:186](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L186)

___

### formateHover

▸ **formateHover**(`txt`): `string`

提供简单的格式化鼠标悬浮提示的能力

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txt` | `string` | 格式化文字 |

#### Returns

`string`

格式化后的文字

#### Defined in

[AwgEditor.ts:179](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L179)

___

### initCodeEditor

▸ **initCodeEditor**(`editorDom`): ``null`` \| `IStandaloneCodeEditor`

初始化编辑器

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editorDom` | `HTMLElement` | monaco-editor的dom容器 |

#### Returns

``null`` \| `IStandaloneCodeEditor`

monaco-editor create实例

#### Implementation of

CodeEditor.initCodeEditor

#### Defined in

[AwgEditor.ts:195](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L195)

___

### initHover

▸ **initHover**(`params`, `formate?`): `void`

初始化鼠标悬浮提示

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `params` | `HoverParams` \| `HoverParams`[] | `undefined` | 自定义鼠标悬浮提示参数 |
| `formate` | `boolean` | `true` | 是否开启简单的提示格式化功能 |

#### Returns

`void`

#### Implementation of

CodeEditor.initHover

#### Defined in

[AwgEditor.ts:126](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L126)

___

### initSuggestions

▸ **initSuggestions**(`params`): `void`

初始化自定义函数提示

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `string`[] \| `SuggestionsParams`[] | 自定义函数提示参数 |

#### Returns

`void`

#### Implementation of

CodeEditor.initSuggestions

#### Defined in

[AwgEditor.ts:101](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L101)

___

### setLanguage

▸ **setLanguage**(`lan`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lan` | `string` | 设置编辑器语言 |

#### Returns

`void`

#### Implementation of

CodeEditor.setLanguage

#### Defined in

[AwgEditor.ts:40](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L40)

___

### getInstance

▸ `Static` **getInstance**(): [`AwgEditor`](AwgEditor.md)

**`return(awgeditor)`**

#### Returns

[`AwgEditor`](AwgEditor.md)

#### Defined in

[AwgEditor.ts:28](https://github.com/ciqtek/awg-editor/blob/3fd8f3c/src/AwgEditor.ts#L28)
