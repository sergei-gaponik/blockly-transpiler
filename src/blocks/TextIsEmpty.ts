import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class TextIsEmpty implements Block {
  static toolboxCategory = 'Text';
  static toolboxSchema = {
    type: 'text_isEmpty',
    kind: 'block',
    inputs: {
      VALUE: {
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
      'VALUE',
      Order.ATOMIC,
    );
    return ['isEmptyString(' + innerCode + ')', 0];
  }
}
