import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class ListsSort implements Block {
  static generate(block: Blockly.Block): [string, number] {
    const direction = block.getFieldValue('DIRECTION');
    const type = block.getFieldValue('TYPE');
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'LIST',
      Order.ATOMIC,
    );

    return [`listSort(${innerCode || 'null'}, "${direction}", "${type}")`, 0];
  }

  static toolboxCategory = 'Lists';
  static toolboxSchema = {
    kind: 'block',
    type: 'lists_sort',
    fields: {
      TYPE: 'NUMERIC',
      DIRECTION: '1',
    },
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
}
