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
