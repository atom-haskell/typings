declare module Autocomplete {
  type Suggestion = {
    text?: string,
    snippet?: string,
    displayText?: string,
    replacementPrefix?: string,
    type?: string,
    leftLabel?: string,
    leftLabelHTML?: string,
    rightLabel?: string,
    rightLabelHTML?: string,
    className?: string,
    iconHTML?: string,
    description?: string,
    descriptionMarkdown?: string,
    descriptionMoreURL?: string,
  };

  type Request = {
    editor: AtomTypes.TextEditor,
    bufferPosition: AtomTypes.Point,
    scopeDescriptor: string,
    prefix: string,
    activatedManually?: boolean,
  };

  type Provider = {
    selector: string,
    getSuggestions: (
      request: Request,
    ) => Promise<Maybe<Array<Suggestion>>>,
    disableForSelector?: string,
    inclusionPriority?: number,
    excludeLowerPriority?: boolean,
  };
}
