const htmlToMarkdown = require('./htmlToMarkdown');

it('converts', async () => {
  const contents = await htmlToMarkdown(
    '<div><h1>Heading</h1><p>contents</p><p>Other P</p></div>'
  );
  expect(contents).toContain('# Heading');
  expect(contents).toContain('contents');
});

it('converts links', async () => {
  const contents = await htmlToMarkdown(
    '<div><a href="https://hiroy.club">Say Hi Roy</a>Not in link</div>'
  );
  expect(contents).toContain('[Say Hi Roy](https://hiroy.club)');
});
