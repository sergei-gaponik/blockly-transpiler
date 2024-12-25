import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block, BlockDefinition } from '../types';

export class ListsIncludes implements Block {
  static template: BlockDefinition = {
    init: function (this: Blockly.Block) {
      this.jsonInit({
        message0: '%{BKY_LISTS_INCLUDES}',
        args0: [
          {
            type: 'input_value',
            name: 'LIST',
            check: 'Array',
          },
          {
            type: 'input_value',
            name: 'FIND_ITEM',
          },
        ],
        output: 'Boolean',
        style: 'list_blocks',
        tooltip: '%{BKY_LISTS_INCLUDES_TOOLTIP}',
        helpUrl: '%{BKY_LISTS_INCLUDES_HELPURL}',
        inputsInline: true,
      });
    },
  };

  static toolboxCategory = 'Lists';
  static toolboxSchema = {
    kind: 'block',
    type: 'lists_includes',
    inputs: {
      LIST: {
        shadow: {
          type: 'lists_create_with',
          mutation: {
            items: 0,
          },
        },
      },
      FIND_ITEM: {
        shadow: {
          type: 'text',
          fields: {
            TEXT: '',
          },
        },
      },
    },
  };

  static generate(block: Blockly.Block): [string, number] {
    const list = javascriptGenerator.valueToCode(block, 'LIST', Order.ATOMIC);
    const item = javascriptGenerator.valueToCode(
      block,
      'FIND_ITEM',
      Order.ATOMIC,
    );
    return [`listIncludes(${list || 'null'}, ${item || 'null'})`, 0];
  }

  static setup() {
    Blockly.Msg.LISTS_INCLUDES = 'List %1 includes %2';
  }
}
