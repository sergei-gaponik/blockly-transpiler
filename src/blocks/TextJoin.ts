import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import type { Block } from '../types';

export class TextJoin implements Block {
  static toolboxCategory = 'Text';
  static toolboxSchema = {
    kind: 'block',
    type: 'text_join',
  };

  static generate(block: Blockly.Block): [string, number] {
    const innerCodeList = block.inputList.map((input) =>
      javascriptGenerator.valueToCode(block, input.name, Order.ATOMIC),
    );
    return ['join([' + innerCodeList.join(',') + '])', 0];
  }
}
