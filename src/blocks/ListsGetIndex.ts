import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class ListsGetIndex implements Block {
  static generate(block: Blockly.Block): [string, number] {
    const mode = block.getFieldValue('MODE');
    const where = block.getFieldValue('WHERE');
    const list = javascriptGenerator.valueToCode(block, 'LIST', Order.ATOMIC);
    let at = '';
    if (where === 'FROM_START' || where === 'FROM_END') {
      at = javascriptGenerator.valueToCode(block, 'AT', Order.ATOMIC) || '1';
    }
    return [`listGetIndex(${list}, '${mode}', '${where}', ${at})`, 0];
  }

  static toolboxCategory = 'Lists';
  static toolboxSchema = {
    kind: 'block',
    type: 'lists_getIndex',
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
