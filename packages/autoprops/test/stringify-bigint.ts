import I from 'big-integer'
import test from 'tape'
import { stringifyBigInt } from '../src/stringify-bigint'

test('autoprops: stringifyBigInt', (t) => {
  t.equals(
    stringifyBigInt(I(Number.MAX_SAFE_INTEGER)),
    'p18S4dnq7',
    'should stringify'
  )

  t.end()
})
