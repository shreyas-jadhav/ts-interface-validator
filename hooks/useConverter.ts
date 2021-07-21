import { message } from 'antd';
import { useEffect, useState } from 'react';
const defaultValueTypeScript = `
interface User {
    name: string;
    age: number;
    isActive?: boolean;
}`;
const useConverter = () => {
	const [typescript, setTypescript] = useState(defaultValueTypeScript);
	const [javascript, setJavascript] = useState('');

	const handleTypeScriptChange = (value: string | undefined) => {
		if (typeof value == 'string') {
			setTypescript(value);
		}
	};

	useEffect(() => {
		extractData(typescript).then(({ name, fields }) => {
			setJavascript(getJavaScriptFunction(name, fields));
		});
	}, [typescript]);

	return { handleTypeScriptChange, typescript, javascript };
};

type CodeData = {
	name: string;
	fields: Field[];
};
const extractData = async (typescript: string): Promise<CodeData> => {
	const name = typescript.slice(typescript.search(`interface`), typescript.search(`{`) + 1).split(` `)[1];
	console.log(name);

	const res = await fetch(`http://localhost:3000/api/converter`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			typescript,
		}),
	});

	if (res.status !== 200) return message.error(`Something went wrong! Please enter only valid typescript interface!`);
	const fields = (await res.json()).data;
	console.log(fields);
	return {
		name,
		fields,
	};
};
const getJavaScriptFunction = (name: string, fields: Field[]) => {
	let functionString: string = `
const validate${name} = (${name.toLowerCase()}) => {
`;
	fields.forEach((field) => {
		if (field.optional) functionString += `    if(typeof ${name.toLowerCase()}.${field.name} !== '${field.type}' && typeof ${name.toLowerCase()}.${field.name} !== 'undefined') throw new Error(\`Missing / Invalid Field - ${field.name}\`);\n`;
		else functionString += `    if(typeof ${name.toLowerCase()}.${field.name} !== '${field.type}') throw new Error(\`Missing / Invalid Field ${field.name}\`);\n`;
	});

	functionString += `}`;
	return functionString;
};

type Field = {
	type: 'string' | 'number' | 'boolean' | 'object' | 'any';
	name: string;
	optional?: boolean;
};

export default useConverter;
