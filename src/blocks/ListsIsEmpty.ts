import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class ListsIsEmpty implements Block {
  static generate(block: Blockly.Block): [string, number] {
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'VALUE',
      Order.ATOMIC,
    );
    return ['isEmptyList(' + innerCode + ')', 0];
  }

  static toolboxCategory = 'Lists';
  static toolboxSchema = {
    kind: 'block',
    type: 'lists_isEmpty',
    inputs: {
      VALUE: {
        shadow: {
          type: 'lists_create_with',
          mutation: {
            items: 0,
          },
        },
      },
    },
  };
}
