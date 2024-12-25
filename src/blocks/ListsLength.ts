import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class ListsLength implements Block {
  static toolboxCategory = 'Lists';
  static toolboxSchema = {
    kind: 'block',
    type: 'lists_length',
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

  static generate(block: Blockly.Block): [string, number] {
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'VALUE',
      Order.ATOMIC,
    );
    return ['listLength(' + innerCode + ')', 0];
  }
}
