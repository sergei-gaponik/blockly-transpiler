import { javascriptGenerator, Order } from 'blockly/javascript';
import * as Blockly from 'blockly';
import type { BlockDefinition, Block } from '../types';

export class ConditionEvaluator implements Block {
  static template: BlockDefinition = {
    init: function (this: Blockly.Block) {
      this.jsonInit({
        message0: '%{BKY_CONTROLS_IF_IF_TITLE_IF}%1',
        style: 'logic_blocks',
        args0: [
          {
            type: 'input_value',
            name: 'CONDITION',
            check: 'Boolean',
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
      'CONDITION',
      Order.ATOMIC,
    );

    return innerCode;
  }
}
