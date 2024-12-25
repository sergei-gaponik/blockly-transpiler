import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class MathSingle implements Block {
  static toolboxCategory = 'Math';
  static toolboxSchema = {
    kind: 'block',
    type: 'math_single',
    fields: {
      OP: 'ROOT',
    },
    inputs: {
      NUM: {
        shadow: {
          type: 'math_number',
          fields: {
            NUM: 9,
          },
        },
      },
    },
  };

  static generate(block: Blockly.Block): [string, number] {
    const op = block.getFieldValue('OP');
    const innerCode = javascriptGenerator.valueToCode(
      block,
      'NUM',
      Order.ATOMIC,
    );
    return [`mathSingle(${innerCode}, '${op}')`, 0];
  }
}
