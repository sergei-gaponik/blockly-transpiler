import { ConditionEvaluator } from './blocks/ConditionEvaluator';
import { ExpressionEvaluator } from './blocks/ExpressionEvaluator';
import { PropertyAccessor } from './blocks/PropertyAccessor';
import { Block, BlockDefinition, BlocklyGenerator } from './types';
import { TextLength } from './blocks/TextLength';
import { TextIsEmpty } from './blocks/TextIsEmpty';
import { TextJoin } from './blocks/TextJoin';
import { TextTrim } from './blocks/TextTrim';
import { TextChangeCase } from './blocks/TextChangeCase';
import { TextIncludes } from './blocks/TextIncludes';
import { ListsLength } from './blocks/ListsLength';
import { ListsIsEmpty } from './blocks/ListsIsEmpty';
import { ListsGetIndex } from './blocks/ListsGetIndex';
import { ListsSplit } from './blocks/ListsSplit';
import { ListsSort } from './blocks/ListsSort';
import { ListsReverse } from './blocks/ListsReverse';
import { ListsIncludes } from './blocks/ListsIncludes';
import { MathSingle } from './blocks/MathSingle';
import { TextSanitize } from './blocks/TextSanitize';
import { javascriptGenerator } from 'blockly/javascript';
import * as Blockly from 'blockly';

export class BlockFactory {
  private static blocks: Record<string, typeof Block> = {
    expression_evaluator: ExpressionEvaluator,
    property_accessor: PropertyAccessor,
    condition_evaluator: ConditionEvaluator,
    text_length: TextLength,
    text_isEmpty: TextIsEmpty,
    text_sanitize: TextSanitize,
    text_join: TextJoin,
    text_trim: TextTrim,
    text_changeCase: TextChangeCase,
    text_includes: TextIncludes,
    lists_length: ListsLength,
    lists_isEmpty: ListsIsEmpty,
    lists_getIndex: ListsGetIndex,
    lists_split: ListsSplit,
    lists_sort: ListsSort,
    lists_reverse: ListsReverse,
    lists_includes: ListsIncludes,
    math_single: MathSingle,
  };

  private static getTemplates() {
    return Object.entries(this.blocks).reduce(
      (acc, [key, BlockClass]) => ({
        ...acc,
        ...(BlockClass.template && { [key]: BlockClass.template }),
      }),
      {} as Record<string, BlockDefinition>,
    );
  }

  private static getGenerators() {
    return Object.entries(this.blocks).reduce((acc, [key, block]) => {
      if ('generate' in block) {
        return { ...acc, [key]: block.generate as BlocklyGenerator };
      }
      return acc;
    }, {} as Record<string, BlocklyGenerator>);
  }

  public static getToolbox() {
    const categories = [
      { name: 'Variables', categorystyle: 'variable_category' },
      { name: 'Logic', categorystyle: 'logic_category' },
      { name: 'Lists', categorystyle: 'list_category' },
      { name: 'Text', categorystyle: 'text_category' },
      { name: 'Math', categorystyle: 'math_category' },
    ];

    return {
      kind: 'categoryToolbox',
      contents: categories.map((category) => ({
        ...category,
        kind: 'category',
        contents: Object.values(this.blocks)
          .filter((block) => block.toolboxCategory === category.name)
          .map((block) => block.toolboxSchema),
      })),
    };
  }

  public static make() {
    Object.values(this.blocks).forEach((block) => {
      if (block.setup) {
        block.setup();
      }
    });

    Blockly.common.defineBlocks(this.getTemplates());

    javascriptGenerator.forBlock = this.getGenerators();
  }
}
