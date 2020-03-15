import test from 'ava'
import path from 'path'
import { estimoJsMode } from '../../js-mode'
import { findChrome } from '../../../scripts/chrome-detection'

test('estimoJsMode - should works properly', async t => {
  const lib1 = path.join(__dirname, '..', '__mock__', '19kb.js')
  const lib2 = path.join(__dirname, '..', '__mock__', '13kb.js')

  const chromePath = await findChrome()

  const reports = await estimoJsMode([lib1, lib2], {
    executablePath: chromePath,
  })

  t.is(reports[0].name, '19kb.js')
  t.is(typeof reports[0].parseHTML === 'number' && reports[0].parseHTML >= 0, true)
  t.is(typeof reports[0].styleLayout === 'number' && reports[0].styleLayout >= 0, true)
  t.is(
    typeof reports[0].paintCompositeRender === 'number' && reports[0].paintCompositeRender >= 0,
    true
  )
  t.is(
    typeof reports[0].scriptParseCompile === 'number' && reports[0].scriptParseCompile >= 0,
    true
  )
  t.is(typeof reports[0].scriptEvaluation === 'number' && reports[0].scriptEvaluation >= 0, true)
  t.is(typeof reports[0].javaScript === 'number' && reports[0].javaScript > 0, true)
  t.is(typeof reports[0].garbageCollection === 'number' && reports[0].garbageCollection >= 0, true)
  t.is(typeof reports[0].other === 'number' && reports[0].other >= 0, true)
  t.is(typeof reports[0].total === 'number' && reports[0].total > 0, true)

  t.is(reports[1].name, '13kb.js')
  t.is(typeof reports[1].parseHTML === 'number' && reports[1].parseHTML >= 0, true)
  t.is(typeof reports[1].styleLayout === 'number' && reports[1].styleLayout >= 0, true)
  t.is(
    typeof reports[1].paintCompositeRender === 'number' && reports[1].paintCompositeRender >= 0,
    true
  )
  t.is(
    typeof reports[1].scriptParseCompile === 'number' && reports[1].scriptParseCompile >= 0,
    true
  )
  t.is(typeof reports[1].scriptEvaluation === 'number' && reports[1].scriptEvaluation >= 0, true)
  t.is(typeof reports[1].javaScript === 'number' && reports[1].javaScript > 0, true)
  t.is(typeof reports[1].garbageCollection === 'number' && reports[1].garbageCollection >= 0, true)
  t.is(typeof reports[1].other === 'number' && reports[1].other >= 0, true)
  t.is(typeof reports[1].total === 'number' && reports[1].total > 0, true)
})
