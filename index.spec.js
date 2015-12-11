import test from 'ava'

import { createPackageName, createImageName } from '.'

test( 'createPackageName', t => {

  const packageConfigSimple = {
    name: 'test'
  }

  t.is( createPackageName( packageConfigSimple ), 'test' )

  const packageConfigScope = {
    name: '@fredo/test'
  }

  t.is( createPackageName( packageConfigScope ), 'fredo/test' )

  const packageConfigScopeOverride = {
    name: '@fredo/test',
    config: {
      dockerScope: 'mario'
    }
  }

  t.is( createPackageName( packageConfigScopeOverride ), 'mario/test' )

} )

test( 'createImageName', t => {

  const packageConfig = {
    name: '@elmariofredo/test'
  }

  const generatedImageName = createImageName( packageConfig )

  t.is( generatedImageName, 'elmariofredo/test:254835b8e48acde5c6630d2b2f17231066156a2b' )

} )
