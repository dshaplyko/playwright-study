function toBeInObject(received: string, object: any) {
  const pass = received in object;
  if (pass) {
    return {
      message: () => `expected ${received} to be a part of ${object}`,
      pass: true,
    };
  }
  return {
    message: () => `expected ${received} to be a part of ${JSON.stringify(object)} keys`,
    pass: false,
  };
}
export default {
  toBeInObject,
};
