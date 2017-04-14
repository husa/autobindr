import test from './spec';

import * as dist from '../'; // "main" from package.json
import * as min from '../dist/autobindr.min';

console.log('UMD build');
test(dist.default);

console.log('UMD minified');
test(min.default);
