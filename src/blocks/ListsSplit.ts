import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class ListsSplit implements Block {
  static generate(block: Blockly.Block): [string, number] {
    const mode = block.getFieldValue('MODE');
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'INPUT',
      Order.ATOMIC,
    );
    const delimInnerCode = javascriptGenerator.valueToCode(
      block,
      'DELIM',
      Order.ATOMIC,
    );

    return [
      `listSplit(${innerCode || 'null'}, "${mode}", ${
        delimInnerCode || 'null'
      })`,
      0,
    ];
  }

  static toolboxCategory = 'Lists';
  static toolboxSchema = {
    kind: 'block',
    type: 'lists_split',
    inputs: {
      INPUT: {
        shadow: {
          type: 'text',
          fields: {
            TEXT: '',
          },
        },
      },
      DELIM: {
        shadow: {
          type: 'text',
          fields: {
            TEXT: ',',
          },
        },
      },
    },
  };
}
