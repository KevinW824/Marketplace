const Templater = require('./templater');

/** */
test('Undefined', () => {
  const t = new Templater(undefined);
  expect(t.apply({})).toBe(undefined);
});

/** */
test('Single Tag', () => {
  const t = new Templater('Hello {{tag}}');
  expect(t.apply({tag: 'World'})).toBe('Hello World');
});

/** */
test('Multi Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little lamb');
});

/** */
test('Missing Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

/** */
test('Missing Tag Strict', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(() => t.apply({had: 'had', lamb: 'lamb'}, true))
      .toThrowError();
});


// Additional Tests
test('Multiple Missing Tag Strict', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(() => t.apply({had: 'had'}, true))
      .toThrowError();
});

/** */
test('White space in tag', () => {
  const t = new Templater('Mary {{had }} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary a little lamb');
});

/** */
test('Multiple white spaces in tags', () => {
  const t = new Templater('Mary {{had }} a {{ little }} {{  lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary a ');
});

/** */
test('No space', () => {
  const t = new Templater('Mary {{had}}{{little}}');
  expect(t.apply({had: 'had', little: 'little'}))
      .toBe('Mary hadlittle');
});

/** */
test('Same tag', () => {
  const t = new Templater('Mary {{had}} {{had}}');
  expect(t.apply({had: 'had', had: 'had'}))
      .toBe('Mary had had');
});

/** */
test('Sparated by other chars', () => {
  const t = new Templater('Mary {{had}}-{{little}}');
  expect(t.apply({had: 'had', little: 'little'}))
      .toBe('Mary had-little');
});

/** */
test('Edge case for Regex', () => {
  const t = new Templater('Mary {{had}} {} {{little}}');
  expect(t.apply({had: 'had', little: 'little'}))
      .toBe('Mary had {} little');
});
