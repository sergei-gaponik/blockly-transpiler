import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block, BlockDefinition } from '../types';

export class TextIncludes implements Block {
  static template: BlockDefinition = {
    init: function (this: Blockly.Block) {
      this.jsonInit({
        message0: '%{BKY_TEXT_INCLUDES}',
        args0: [
          {
            type: 'input_value',
            name: 'TEXT',
            check: 'String',
          },
          {
            type: 'input_value',
            name: 'FIND_ITEM',
            check: 'String',
          },
        ],
        output: 'Boolean',
        style: 'text_blocks',
        tooltip: '%{BKY_TEXT_INCLUDES_TOOLTIP}',
        helpUrl: '%{BKY_TEXT_INCLUDES_HELPURL}',
        inputsInline: true,
      });
    },
  };

  static toolboxCategory = 'Text';
  static toolboxSchema = {
    kind: 'block',
    type: 'text_includes',
    inputs: {
      TEXT: {
        shadow: {
          type: 'text',
          fields: {
            TEXT: '',
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
    const text = javascriptGenerator.valueToCode(block, 'TEXT', Order.ATOMIC);
    const item = javascriptGenerator.valueToCode(
      block,
      'FIND_ITEM',
      Order.ATOMIC,
    );
    return [`textIncludes(${text || 'null'}, ${item || 'null'})`, 0];
  }

  static setup() {
    Blockly.Msg.TEXT_INCLUDES = 'Text %1 includes %2';
  }
}
