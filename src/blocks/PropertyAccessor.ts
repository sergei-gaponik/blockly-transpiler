import * as Blockly from 'blockly';
import { Block } from '../types';

export const PropertyAccessorTemplate: any = {
  dataContext(): object {
    return (this.workspace as any)?.getDataContext?.() || { object: 'String' };
  },
  valuePath: [],
  input: null,
  MAX_LEVEL: 10,
  removeFieldsAfter(index: any) {
    for (let i = index + 1; i < this.MAX_LEVEL; i++) {
      try {
        this.input.removeField('LEVEL_' + i);
      } catch (e) {}
    }
    this.valuePath = this.valuePath.slice(0, index + 1);
  },
  accessValue(obj: any, path: any) {
    let p = obj;
    for (let i = 0, _path = path; i < path.length; i++) {
      p = p[_path[i]];
    }
    return p;
  },
  value(level = -1) {
    if (level == -1)
      return this.accessValue(this.dataContext(), this.valuePath);
    if (level == 0) return this.dataContext();
    return this.accessValue(this.dataContext(), this.valuePath.slice(0, level));
  },
  dataType() {
    return typeof this.value() == 'object' ? 'Object' : this.value();
  },
  fieldFactory(el: any, level: any) {
    if (level > this.valuePath.length) return el;

    if (typeof this.value(level) != 'object') return el;

    return this.fieldFactory(
      el.appendField(
        new Blockly.FieldDropdown(
          Object.keys(this.value(level)).map((a) => [a, a]),
          (value) => this.validate(value, level),
        ),
        'LEVEL_' + level,
      ),
      level + 1,
    );
  },
  validate(newValue: any, level: any) {
    this.valuePath[level] = newValue;
    this.removeFieldsAfter(level);
    this.fieldFactory(this.input, level + 1);
    this.setOutput(true, this.dataType());
  },
  init() {
    this.valuePath = [Object.keys(this.dataContext())[0]];
    this.setStyle('variable_blocks');
    this.input = this.appendDummyInput();
    this.fieldFactory(this.input, 0);
    this.setOutput(true, this.dataType());
  },
};

export class PropertyAccessor implements Block {
  static template = PropertyAccessorTemplate;

  static generate(block: Blockly.Block): [string, number] {
    let l: any = [];
    for (let i = 0; true; i++) {
      const v = block.getFieldValue('LEVEL_' + i);
      if (!v) break;
      l.push(v);
    }

    const path = l.join('.').replace(/\.([0-9]+)\./g, '[$1].');

    const code = `(() => {try{return ${path};}catch(e){return null;}})()`;

    return [code, 0];
  }

  static toolboxCategory = 'Variables';
  static toolboxSchema = {
    kind: 'block',
    type: 'property_accessor',
  };
}
