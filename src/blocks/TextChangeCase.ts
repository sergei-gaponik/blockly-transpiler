import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class TextChangeCase implements Block {
  static toolboxCategory = 'Text';
  static toolboxSchema = {
    type: 'text_changeCase',
    kind: 'block',
    fields: {
      CASE: 'UPPERCASE',
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
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'TEXT',
      Order.ATOMIC,
    );
    return [`changeCase(${innerCode}, "${block.getFieldValue('CASE')}")`, 0];
  }
}
