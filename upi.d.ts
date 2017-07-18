declare namespace UPI {
export const enum TEventRangeType {
    context = "context",
    keyboard = "keyboard",
    mouse = "mouse",
    selection = "selection",
}
export type TTooltipFunction = (crange: AtomTypes.Range) => ITooltipData | Promise<ITooltipData>;
export type TRange = AtomTypes.Range | [TPosition, TPosition];
export type TPosition = AtomTypes.Point | [number, number];
export interface IMessageText {
    text: string;
    highlighter?: string;
}
export interface IMessageHTML {
    html: string;
}
export type TMessage = string | IMessageText | IMessageHTML;
export interface ITooltipData {
    range: TRange;
    text: TMessage | TMessage[];
    persistOnCursorMove?: boolean;
}

export type TSingleOrArray<T> = T | T[];
export interface ISetTypesParams {
    [severity: string]: ISeverityTabDefinition;
}
export interface ISeverityTabDefinition {
  /** should uri filter apply to tab? */
  uriFilter?: boolean
  /** should tab auto-scroll? */
  autoScroll?: boolean
}
export type TTextBufferCallback = (buffer: AtomTypes.TextBuffer) => void;
export interface IControlSimpleDefinition {
    element: string;
    opts: IControlOpts;
}
export interface IControlCustomDefinition<T> {
    element: {
        new (arg: T): IElementObject<T>;
    };
    opts: T;
}
export interface IElementObject<T> {
    element: HTMLElement;
    update(props: T): Promise<void>;
}
export interface IControlOpts {
  /** element `id` */
  id?: string
  /** event callbacks, key is event name, e.g. "click" */
  events?: {[key: string]: EventListener}
  /** additional classes to set on element */
  classes?: string[]
  /** css attributes to set on element */
  style?: {[key: string]: string}
  /** html attributes to set on element */
  attrs?: {[key: string]: string}
}
export type TControlDefinition<T> = IControlCustomDefinition<T> | IControlSimpleDefinition;
export interface IParamSpec<T> {
  /**
  name of item key that the filter in select dialog will match
  */
  itemFilterKey: string
  /**
  this will be displayed in the heading of select dialog
  */
  description?: string
  /**
  display name of the parameter in output panel
  */
  displayName?: string
  /**
  default value
  */
  default?: T
  /**
  possible values of the parameter. can be a callback.
  */
  items: T[] | Promise<T[]> | (() => T[] | Promise<T[]>)
  /**
  will be called whenever the value of parameter changes

  @param value new value of the parameter
  */
  onChanged? (value: T): void
  /**
  how an item should be displayed to user

  @param item item to be displayed

  @returns HTML string representing the item
  */
  itemTemplate (item: T): string
  /**
  template for displaying value of parameter in output panel

  @param item item to be displayed

  @returns plaintext string representing the item
  */
  displayTemplate (item?: T): string
}
export type TTooltipHandler = (editor: AtomTypes.TextEditor, crange: AtomTypes.Range, type: TEventRangeType) => ITooltipData | undefined | Promise<ITooltipData | undefined>;
export interface IRegistrationOptions {
  name: string
  menu?: {label: string, menu: AtomTypes.AtomMenuItem[]}
  messageTypes?: ISetTypesParams
  events?: {
    onWillSaveBuffer?: TSingleOrArray<TTextBufferCallback>
    onDidSaveBuffer?: TSingleOrArray<TTextBufferCallback>
    onDidStopChanging?: TSingleOrArray<TTextBufferCallback>
  }
  controls?: Array<TControlDefinition<Object>>
  params?: {[paramName: string]: IParamSpec<Object>}
  tooltip?: TTooltipHandler | {priority?: number, handler: TTooltipHandler, eventTypes?: TEventRangeType[]}
}

export interface IShowTooltipParams {
    editor: AtomTypes.TextEditor;
    eventType?: TEventRangeType;
    detail?: Object;
    tooltip: TTooltipFunction | ITooltipData;
}

export type IUPIRegistration = (options: IRegistrationOptions) => IUPIInstance

export interface IUPIInstance extends AtomTypes.Disposable {
  setMenu(name: string, menu: AtomTypes.AtomMenuItem[]): AtomTypes.Disposable;
  setStatus(status: IStatus): void;
  setMessages(messages: IResultItem[]): void;
  addMessageTab(name: string, opts: ISeverityTabDefinition): void;
  showTooltip({editor, eventType, detail, tooltip}: IShowTooltipParams): void;
  addPanelControl<T>(def: TControlDefinition<T>): AtomTypes.Disposable;
  addConfigParam<T>(paramName: string, spec: IParamSpec<T>): AtomTypes.CompositeDisposable;
  getConfigParam<T>(name: string): Promise<T | undefined>;
  getOthersConfigParam<T>(plugin: string, name: string): Promise<T | undefined>;
  setConfigParam<T>(name: string, value?: T): Promise<T | undefined>;
  getEventRange(editor: AtomTypes.TextEditor, typeOrDetail: Object | TEventRangeType): {
      crange: AtomTypes.Range;
      pos: AtomTypes.Point;
      eventType: TEventRangeType;
  } | undefined;
  dispose(): void;
}
export interface IResultItem {
  /** File URI message relates to */
  uri?: string
  /** position to which message relates */
  position?: TPosition
  /** message itself */
  message: TMessage
  /** message severity, will be shown in corresponding tab */
  severity: TSeverity
  /** any context related to message, will be displayed alongside
      uri and position */
  context?: string
}
export type TSeverity = 'error' | 'warning' | 'lint' | string;
export interface INormalStatus {
  status: 'ready' | 'error' | 'warning'
}

export interface IProgressStatus {
  status: 'progress'
  /**
  float between 0 and 1, only relevant when status is 'progress'
  if 0 or undefined, progress bar is not shown
  */
  progress?: number
}

export type IStatus = (INormalStatus | IProgressStatus) & {detail: string}
}
