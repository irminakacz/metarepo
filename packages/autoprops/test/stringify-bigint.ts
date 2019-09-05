import test from 'blue-tape'
import I from 'big-integer'
import { stringifyBigInt } from '../src/stringify-bigint'

test('stringifyBigInt', (t) => {
  t.equals(
    stringifyBigInt(I(Number.MAX_SAFE_INTEGER)),
    'p18S4dnq7',
    'should stringify'
  )

  t.end()
})
