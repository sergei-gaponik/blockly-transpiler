export interface BlockDefinition {
  init: (this: Blockly.Block) => void;
}

export type BlocklyGenerator = (
  block: Blockly.Block,
) => string | [string, number];

export class Block {
  static template?: BlockDefinition;
  static generate: BlocklyGenerator;
  static setup?: () => void;
  static toolboxSchema: Blockly.utils.toolbox.ToolboxItemInfo | null;
  static toolboxCategory: string | null;
}
