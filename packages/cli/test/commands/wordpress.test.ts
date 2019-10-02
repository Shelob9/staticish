import {expect, test} from '@oclif/test'

describe('wordpress', () => {
  test
    .stdout()
    .command(['wordpress'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['wordpress', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
