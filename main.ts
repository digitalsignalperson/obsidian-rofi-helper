import { App, Plugin } from 'obsidian';

export default class RofiHelperPlugin extends Plugin {
  async onload() {
    console.log('Loading RofiHelperPlugin');

    this.registerObsidianProtocolHandler('switch', ({ vault, id, filename }) => {
		const app = this.app;

		vault = decodeURIComponent(vault);
		id = decodeURIComponent(id);
		filename = decodeURIComponent(filename); // filenames like "mypath/myfile.md"

		if (app.vault.getName() != vault) {
			return;
		}

		app.workspace.iterateAllLeaves(leaf => {
			if (leaf.id === id || leaf.view.file?.path === filename) {
				app.workspace.setActiveLeaf(leaf, { focus: true });
				return;
			}
		});
    });
  }

  onunload() {
    console.log('Unloading RofiHelperPlugin');
  }
}
