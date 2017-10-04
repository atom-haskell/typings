/// <reference path="./atom-generate.d.ts" />

declare module AtomTypes {
  type Marker = any;
  type TextEditorRegistry = any;
  type ReadStream = any;
  type WriteStream = any;
  type IPoint = Point | [number, number] | {row: number, column: number}
  type IRange = Range | [IPoint, IPoint]
  interface AtomMenuCommand {
      label: string;
      command: string;
  }
  interface AtomSubmenu {
      label: string;
      submenu: AtomMenuItem[];
  }
  type AtomMenuItem = AtomMenuCommand | AtomSubmenu;
  interface IteratorArgs {
    match: RegExpMatchArray
    matchText: string
    range: Range
    stop(): void
    replace(arg: string): void
    leadingContextLines: string[]
    trailingContextLines: string[]
  }
  type IteratorFunction = (args: IteratorArgs) => void;
  interface AtomEnvironment {
    getConfigDirPath(): string
  }
  interface IEventDesc {
    currentTarget: HTMLElement & { getModel (): AtomTypes.TextEditor }
    abortKeyBinding? (): void
    detail: Object
  }
  interface TEmitter<EmitterArgMap> extends AtomTypes.Emitter {
      on<K extends keyof EmitterArgMap> (eventName: K, handler: (arg: EmitterArgMap[K]) => void): AtomTypes.Disposable
      emit<K extends keyof EmitterArgMap> (eventName: K, value: EmitterArgMap[K]): void
  }
  export interface IDisposable {
    dispose(): any
  }
  export type IteratorCallback = (arg: {
    match: RegExpMatchArray
    matchText: string
    range: Range
    stop: () => void
    replace: (replacement: string) => void
  }) => void
  interface ConfigInterface {
    'editor.commentStart': string | null
    'editor.commentEnd': string | null
    'editor.increaseIndentPattern': string | null
    'editor.decreaseIndentPattern': string | null
    'editor.foldEndPattern': string | null
    'editor.fontFamily': string
    'editor.fontSize': number
    'editor.lineHeight': string | number
    'editor.showCursorOnSelection': boolean
    'editor.showInvisibles': boolean
    'editor.showIndentGuide': boolean
    'editor.showLineNumbers': boolean
    'editor.atomicSoftTabs': boolean
    'editor.autoIndent': boolean
    'editor.autoIndentOnPaste': boolean
    'editor.nonWordCharacters': string
    'editor.preferredLineLength': number
    'editor.tabLength': number
    'editor.softWrap': boolean
    'editor.softTabs': boolean
    'editor.tabType': 'auto' | 'soft' | 'hard'
    'editor.softWrapAtPreferredLineLength': boolean
    'editor.softWrapHangingIndent': number
    'editor.scrollSensitivity': number
    'editor.scrollPastEnd': boolean
    'editor.undoGroupingInterval': number
    'editor.confirmCheckoutHeadRevision': boolean
    'editor.invisibles': {
      eol: boolean | string
      space: boolean | string
      tab: boolean | string
      cr: boolean | string
    }
    'editor.zoomFontWhenCtrlScrolling': boolean
    'autocomplete-plus.enableAutoActivation': boolean
    'autocomplete-plus.autoActivationDelay': number
    'autocomplete-plus.maxVisibleSuggestions': number
    'autocomplete-plus.confirmCompletion': 'tab' | 'enter' | 'tab and enter' | 'tab always, enter when suggestion explicitly selected'
    'autocomplete-plus.useCoreMovementCommands': boolean
    'autocomplete-plus.fileBlacklist': Array<string>
    'autocomplete-plus.scopeBlacklist': Array<string>
    'autocomplete-plus.includeCompletionsFromAllBuffers': boolean
    'autocomplete-plus.strictMatching': boolean
    'autocomplete-plus.minimumWordLength': number
    'autocomplete-plus.enableBuiltinProvider': boolean
    'autocomplete-plus.builtinProviderBlacklist': string
    'autocomplete-plus.backspaceTriggersAutocomplete': boolean
    'autocomplete-plus.enableAutoConfirmSingleSuggestion': boolean
    'autocomplete-plus.suggestionListFollows': 'Word' | 'Cursor'
    'autocomplete-plus.defaultProvider': 'Fuzzy' | 'Symbol'
    'autocomplete-plus.suppressActivationForEditorClasses': Array<string>
    'autocomplete-plus.consumeSuffix': boolean
    'autocomplete-plus.useAlternateScoring': boolean
    'autocomplete-plus.useLocalityBonus': boolean
    'autocomplete-plus.enableExtendedUnicodeSupport': boolean
  }
}

declare module "atom" {
    export = AtomTypes;
}

interface Window {
    atom: AtomTypes.AtomEnvironment;
    measure(description:string, fn:Function):any; // return fn result
    profile(description:string, fn:Function):any; // return fn result
}

declare var atom: AtomTypes.AtomEnvironment;
