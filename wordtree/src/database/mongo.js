import monk from 'monk'
import secret from '../public/secret';

const mongoConfig = secret.mongoConfig;
const Mongo = monk(mongoConfig);

export default Mongo;