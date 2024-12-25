import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block, BlockDefinition } from '../types';

export class TextSanitize implements Block {
  static template: BlockDefinition = {
    init: function (this: Blockly.Block) {
      this.jsonInit({
        message0: '%{BKY_TEXT_SANITIZE}',
        style: 'text_blocks',
        args0: [
          {
            type: 'input_value',
            name: 'TEXT',
            check: 'String',
          },
          {
            type: 'field_dropdown',
            name: 'FUNCTION',
            options: [['%{BKY_TEXT_SANITIZE_STRIP_HTML}', 'STRIP_HTML']],
          },
        ],
        output: 'String',
        inputsInline: true,
      });
    },
  };

  static toolboxCategory = 'Text';
  static toolboxSchema = {
    kind: 'block',
    type: 'text_sanitize',
    inputs: {
      TEXT: {
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
    const func = block.getFieldValue('FUNCTION');
    return [`sanitizeText(${text}, '${func}')`, 0];
  }

  static setup() {
    Blockly.Msg.TEXT_SANITIZE = 'Sanitize %1 with %2';
    Blockly.Msg.TEXT_SANITIZE_STRIP_HTML = 'Strip HTML';
  }
}
