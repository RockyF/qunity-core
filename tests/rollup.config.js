/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');

export default {
	output: {
		format: 'cjs'
	},
	plugins: [
		typescript({
			typescript: require('typescript'),
			include: ['**/*.ts+(|x)', '../src/**/*.ts+(|x)',]
		}),
	]
};
