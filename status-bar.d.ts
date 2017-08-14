declare module StatusBar {
  export type RawStatusBarTile = {
    item: HTMLElement,
    priority: number,
  };

  export type StatusBarTile = {
    getPriority(): number,
    getItem(): HTMLElement,
    destroy(): void,
  };

  export class ScopeDescriptor {
    constructor(object: {scopes: Array<string>})
    getScopesArray(): Array<string>
  }

  /**
   * This API is defined at https://github.com/atom/status-bar.
   */
  export class StatusBar {
    addLeftTile(tile: RawStatusBarTile): StatusBarTile
    addRightTile(tile: RawStatusBarTile): StatusBarTile
    getLeftTiles(): Array<StatusBarTile>
    getRightTiles(): Array<StatusBarTile>
  }
}
