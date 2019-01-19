import { normalize } from 'normalizr';

const normalizeData = (data, schema) => normalize(data, schema);

export default normalizeData;
