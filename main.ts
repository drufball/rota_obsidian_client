import { Notice, Plugin } from 'obsidian';

type ParsedFile = {
    title: string;
    content: string;
}

export default class RotaPlugin extends Plugin {
	async onload() {
        this.addRibbonIcon('dice', 'Greet', async () => {
            const fileContents = await this.fileContentsToSummarize();
            const summary = await this.summarize_files(fileContents);
            new Notice(`${summary} was received!!`);
        });
	}

    async onunload() {

    }

    async fileContentsToSummarize(): Promise<ParsedFile[]> {
        const { vault } = this.app;

        const files = vault.getMarkdownFiles();
        const fileReads = files.map(async (file) => {
            const title = file.name;
            const content = await vault.read(file);
            return {title, content};
        });
        const fileContents = await Promise.all(fileReads);
        return fileContents;
    }

    async summarize_files(files: ParsedFile[]): Promise<string> {

        const res = await fetch("http://localhost:8000/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ files }),
        })

        const { summary } = await res.json();
        return summary;
    }
}