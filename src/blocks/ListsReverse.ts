import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class ListsReverse implements Block {
  static toolboxCategory = 'Lists';
  static toolboxSchema = {
    kind: 'block',
    type: 'lists_reverse',
    inputs: {
      LIST: {
        shadow: {
          type: 'lists_create_with',
          mutation: {
            items: 0,
          },
        },
      },
    },
  };

  static generate(block: Blockly.Block): [string, number] {
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'LIST',
      Order.ATOMIC,
    );
    return [`listReverse(${innerCode})`, 0];
  }
}
