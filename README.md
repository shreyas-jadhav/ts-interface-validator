### Demo: [ts-interface-validator.vercel.app](https://ts-interface-validator.vercel.app/)

## About
Have you ever got bored of writing validation code for a JavaScript object to satisfy a TypeScript interface?
This Web App does that for you. Paste you TypeScript interface on the left and a validator function will be generated on the right. 
#### Do not rely on generated code fully, do review it once. This is not fully functional. 

## Limitations
Currently this supports only following data types: 
* `number`
* `string`
* `object`
* `undefined` (optional fields with `?` )
* `boolean`
* `null`

## Working
The backend relies on TypeScript compiler API, which tries to find the interfaces & it's fields witht their types, and sends data to front end React Application which generates the validator function out of it. Due to lack of knowledge and documentation for compiler API i couldn't make much progress on this for complex data types. 
