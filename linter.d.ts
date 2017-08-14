declare module Linter {
  export type StandardLinter = {
    name: string,
    scope: 'file' | 'project',
    lintOnFly: boolean,
    grammarScopes: Array<string>,
    lint(textEditor: AtomTypes.TextEditor): Maybe<Array<Message>> | Promise<Maybe<Array<Message>>>,
  };

  export type Message = {
    type: string,
    text?: string,
    html?: string,
    name?: string,
    // ^ Only specify this if you want the name to be something other than your linterProvider.name
    // WARNING: There is NO replacement for this in v2
    filePath?: string,
    // ^ MUST be an absolute path (relative paths are not supported)
    range?: AtomTypes.IRange,
    trace?: Array<Trace>,
    fix?: Fix,
    severity?: 'error' | 'warning' | 'info',
    selected?: Function,
    // ^ WARNING: There is NO replacement for this in v2
  };

  export type Trace = {
    type: 'Trace',
    text?: string,
    html?: string,
    name?: string,
    // ^ Only specify this if you want the name to be something other than your linterProvider.name
    // WARNING: There is NO replacement for this in v2
    filePath?: string,
    // ^ MUST be an absolute path (relative paths are not supported)
    range?: Range,
    class?: string,
    severity?: 'error' | 'warning' | 'info',
  };

  export type Fix = {
    range: Range,
    newText: string,
    oldText?: string,
  };

  export type Config = {
    name: string,
  };

  export type IndieRegistry = {
    register(config: Config): Indie,
  };

  export type Indie = {
    deleteMessages(): void,
    setMessages(messages: Array<Message>): void,
    dispose(): void,
  };

  export type V2IndieDelegate = {
    name(): string,
    getMessages(): Array<Message>,
    clearMessages(): void,
    setMessages(filePath: string, messages: Array<V2Message>): void,
    setAllMessages(messages: Array<V2Message>): void,
    onDidUpdate(callback: Function): AtomTypes.Disposable,
    onDidDestroy(callback: Function): AtomTypes.Disposable,
    dispose(): void,
  }

  type V2Message = {
    // NOTE: These are given by providers
    location: {
      file: string,
      // ^ MUST be an absolute path (relative paths are not supported)
      position: Range,
    },
    // ^ Location of the issue (aka where to highlight)
    reference?: {
      file: string,
      // ^ MUST be an absolute path (relative paths are not supported)
      position?: AtomTypes.IPoint,
    },
    // ^ Reference to a different location in the editor, useful for jumping to classes etc.
    url?: string, // external HTTP link
    // ^ HTTP link to a resource explaining the issue. Default is a google search
    icon?: string,
    // ^ Name of octicon to show in gutter
    excerpt: string,
    // ^ Error message
    severity: 'error' | 'warning' | 'info',
    // ^ Severity of error
    solutions?: Array<{
      title?: string,
      position: Range,
      priority?: number,
      currentText?: string,
      replaceWith: string,
    } | {
      title?: string,
      position: Range,
      priority?: number,
      apply: (() => any),
    }>,
    // ^ Possible solutions to the error (user can invoke them at will)
    description?: string | (() => Promise<string> | string),
    // ^ Markdown long description of the error, accepts callback so you can do
    // http requests etc.
    linterName?: string,
    // ^ Optionally override the displayed linter name. (Defaults to provider)
  }
}
