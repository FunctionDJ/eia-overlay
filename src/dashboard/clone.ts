export default <T extends Object>(any: T): T =>
  JSON.parse(JSON.stringify(any));
