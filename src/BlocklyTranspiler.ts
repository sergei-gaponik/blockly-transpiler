import { BlockFactory } from './BlockFactory';
import { BlocklyContext } from './BlocklyContext';

export class BlocklyTranspiler {
  private static initialized = false;

  public static init() {
    if (this.initialized) return;

    BlockFactory.make();

    this.initialized = true;
  }

  public static createContext(dataContext: object) {
    if (!this.initialized) {
      throw new Error('BlocklyTranspiler not initialized');
    }

    return new BlocklyContext(dataContext);
  }

  public static getToolbox() {
    return BlockFactory.getToolbox();
  }
}
