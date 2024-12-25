import { javascriptGenerator, Order } from 'blockly/javascript';
import * as Blockly from 'blockly';
import type { BlockDefinition, Block } from '../types';

export class ExpressionEvaluator implements Block {
  static template: BlockDefinition = {
    init: function (this: Blockly.Block) {
      this.jsonInit({
        message0: '=%1',
        style: 'variable_blocks',
        args0: [
          {
            type: 'input_value',
            name: 'EXPRESSION',
          },
        ],
      });
    },
  };

  static toolboxCategory = null;
  static toolboxSchema = null;

  static generate(block: Blockly.Block): string {
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'EXPRESSION',
      Order.ATOMIC,
    );

    return innerCode;
  }
}
