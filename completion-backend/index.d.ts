declare module 'atom-haskell-upi/completion-backend' {
import * as AtomTypes from "atom"
export type SymbolType = 'type' | 'class' | 'function' | 'operator' | 'tag'
export interface ISymbol {
    qparent: string | undefined;
    qname: string;
    name: string;
    typeSignature: string | undefined;
    symbolType: SymbolType;
    module: {
      name: string;
      qualified: boolean;
      hiding: boolean;
      importList: null | Array<string | {
          parent: string;
      }>;
      alias: null | string;
    }
}
export interface ICompletionBackend {
    name(): string;
    onDidDestroy(callback: () => void): AtomTypes.Disposable;
    registerCompletionBuffer(buffer: AtomTypes.TextBuffer): AtomTypes.Disposable;
    unregisterCompletionBuffer(buffer: AtomTypes.TextBuffer): void;
    getCompletionsForSymbol(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point): Promise<ISymbol[]>;
    getCompletionsForType(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point): Promise<ISymbol[]>;
    getCompletionsForClass(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point): Promise<ISymbol[]>;
    getCompletionsForModule(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point): Promise<string[]>;
    getCompletionsForSymbolInModule(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point, opts?: {
        module: string;
    }): Promise<ISymbol[]>;
    getCompletionsForLanguagePragmas(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point): Promise<string[]>;
    getCompletionsForCompilerOptions(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point): Promise<string[]>;
    getCompletionsForHole(buffer: AtomTypes.TextBuffer, prefix: string, position: AtomTypes.Point): Promise<ISymbol[]>;
}
}
