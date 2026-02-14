import mkly from './mkly.json';
import untrusted from './untrusted.json';

const projects = [
  ...mkly,
  ...untrusted
].filter(p => p.visible !== false);

export default projects;
