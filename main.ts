import { Notice, Plugin } from 'obsidian';

console.log('File loaded');
export default class RotaPlugin extends Plugin {
	async onload() {
        console.log('RotaPlugin loaded');
	}

    async onunload() {

    }
}