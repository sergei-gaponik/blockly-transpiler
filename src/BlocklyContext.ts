import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export class BlocklyContext {
  constructor(private dataContext: object) {}

  private workspace: Blockly.Workspace = new Blockly.Workspace();

  public initHeadless(): Blockly.Workspace {
    (this.workspace as any).getDataContext = () => this.dataContext;
    javascriptGenerator.init(this.workspace);
    return this.workspace;
  }

  public inject(
    elementId: string,
    options: Blockly.BlocklyOptions,
  ): Blockly.Workspace {
    this.workspace = Blockly.inject(elementId, options);
    (this.workspace as any).getDataContext = () => this.dataContext;
    javascriptGenerator.init(this.workspace);
    return this.workspace;
  }

  public load(state: Blockly.serialization.blocks.State) {
    Blockly.serialization.workspaces.load(state, this.workspace);
  }

  public save() {
    return Blockly.serialization.workspaces.save(this.workspace);
  }

  public append(state: Blockly.serialization.blocks.State) {
    return Blockly.serialization.blocks.append(state, this.workspace);
  }

  public generate() {
    return javascriptGenerator.workspaceToCode(this.workspace);
  }

  public getWorkspace(): Blockly.Workspace {
    return this.workspace;
  }
}
