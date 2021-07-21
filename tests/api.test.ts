global.fetch = require(`node-fetch`);
describe(`API Test`, () => {
	it(`Convert Typescript`, async () => {
		const res = await fetch(`http://localhost:3000/api/converter`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				typescript: `
interface User {
    name: string;
    age: number
    isActive?: boolean;
`,
			}),
		});
		expect(res.status).toBe(200);
	});
});

export {};
