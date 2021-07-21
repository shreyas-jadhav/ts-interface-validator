import { NextApiHandler } from 'next';
import { PropertySignature, createSourceFile, ScriptTarget, ScriptKind, SyntaxKind, InterfaceDeclaration, Identifier } from 'typescript';
import * as ts from 'typescript';

const handler: NextApiHandler = (req, res) => {
	try {
		const sourceText = req.body.typescript;

		const ast = createSourceFile('source.ts', sourceText, ScriptTarget.ES5, false, ScriptKind.TS);

		const interfaceX = ast
			.getChildAt(0)
			.getChildren()
			.find((child) => child.kind === SyntaxKind.InterfaceDeclaration) as InterfaceDeclaration;
		const propX = interfaceX.members;

		const myList: any = [];
		propX.forEach((item: any) => {
			console.log(item.type);
			myList.push({
				name: item.name.escapedText,
				type: sourceText.slice(item.type.pos + 1, item.type.end),
				optional: typeof item.questionToken == 'undefined' ? false : true,
			});
			//console.log(item.type);
		});

		return res.status(200).json({ data: myList });
	} catch (e) {
		console.log(e);
		return res.status(500).send(`Something went wrong!`);
	}
};
export default handler;
