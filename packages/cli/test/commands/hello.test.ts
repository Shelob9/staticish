import {expect, test} from '@oclif/test'

describe('hello', () => {
  test
    .stdout()
    .command(['hello'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hi roy')
    })

  test
    .stdout()
    .command(['hello', '--name', 'Troy'])
    .it('runs hello --name Troy', ctx => {
      expect(ctx.stdout).to.contain('hi Troy')
    })
})
