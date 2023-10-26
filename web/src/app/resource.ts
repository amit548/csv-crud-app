interface Resource<T = void> {
  data?: T;
  results?: number;
  status?: 'success' | 'error' | 'fail';
  message?: string;
}

export default Resource;
