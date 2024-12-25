import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class TextTrim implements Block {
  static toolboxCategory = 'Text';
  static toolboxSchema = {
    type: 'text_trim',
    kind: 'block',
    fields: {
      MODE: 'BOTH',
    },
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
    const mode = block.getFieldValue('MODE');
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'TEXT',
      Order.ATOMIC,
    );
    return ['trim(' + innerCode + ', "' + mode + '")', 0];
  }
}
