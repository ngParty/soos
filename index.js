'use strict'

const shasum = require( 'shasum' )
const spawn = require( 'child_process' ).spawn
const path = require( 'path' )
const fs = require('fs')

const packageConfig = require( path.resolve( process.cwd(), 'package.json' ) )

const PACKAGE_NAME_EXTRACT_EXP = RegExp( '(@(.*)\/)?(.*)' )
const NPM_BIN_PATH = `/usr/local/bin/npm`

module.exports = {
  createPackageName: createPackageName,
  createImageName: createImageName,
  dockerfileInit: dockerfileInit,
  dockerBuild: dockerBuild,
  dockerPush: dockerPush,
  dockerRun: dockerRun
}

/**
 * Create package name based on scope/name or overriden-scope/name
 * @param {Object} packageConfig
 * @return {string}
 */
function createPackageName( packageConfig ) {

  // Parse package name
  const packageConfigNameList = PACKAGE_NAME_EXTRACT_EXP.exec( packageConfig.name )

  const packageConfigName = packageConfigNameList[ 3 ]

  let packageConfigScope = packageConfigNameList[ 2 ]

  if (
    packageConfig.config &&
    packageConfig.config.dockerScope
  ) {

    packageConfigScope = packageConfig.config.dockerScope

  }

  if (
    packageConfigScope === `` ||
    packageConfigScope === undefined
  ) {

    return packageConfigName

  }

  return [
    packageConfigScope,
    packageConfigName
  ].join( '/' )

}

/**
 * Create Docker image name from package.json
 * - create shasum from whole package.json string
 * - get proper package name
 * @param {Object} packageConfig
 * @return {string}
 */
function createImageName( packageConfig ) {

  const packageConfigHash = shasum( JSON.stringify( packageConfig ) )

  const packageConfigName = createPackageName( packageConfig )

  return `${packageConfigName}:${packageConfigHash}`

}

/**
 * Copy dockerfile to project structure
 */
function dockerfileInit() {

  const targetDockerfilePath = path.resolve( process.env.PWD, 'Dockerfile' )
  const writeStream = fs.createWriteStream( targetDockerfilePath )
  writeStream.on("error", _reportError )


  const sourceDockerfilePath = path.resolve( __dirname, 'Dockerfile' )

  const readStream = fs.createReadStream( sourceDockerfilePath )
    .pipe( writeStream )
  readStream.on("error", _reportError )

  function _reportError( err ) {

    console.error( err )

  }

}

/**
 * Spawn subprocess with specified command
 * @param {string} cmd command name to execute
 * @param {string[]} args arguments for executed command
 */
function execCommand( cmd, args ) {

  return spawn( cmd, args, {
    env: process.env,
    cwd: process.env.PWD,
    stdio: [ 'inherit', process.stdout, process.stdout ]
  })

}

/**
 * Execute docker build command
 * @param {Object} packageConfig
 */
function dockerBuild( packageConfig ) {

  const proc = `docker`
  const args = [
    `build`,
    `-t`,
    `${createImageName( packageConfig )}`,
    `.`
  ]

  return execCommand( proc, args )

}

/**
 * Execute docker push command
 * @param {Object} packageConfig
 */
function dockerPush( packageConfig ) {

  const proc = `docker`
  const args = [
    `push`,
    `${createImageName( packageConfig )}`
  ]

  return execCommand( proc, args )

}

/**
 * Run docker run with specified command
 * @param {Object} packageConfig
 * @param {string[]} command
 */
function dockerRun( packageConfig, cmdArgs ) {

  // Make npm start default command
  if (
    cmdArgs === undefined ||
    cmdArgs.command === undefined ||
    cmdArgs.command.length === 0
  ) {

    cmdArgs.command = [
      NPM_BIN_PATH,
      `start`
    ]

  }

  const proc = `docker`

  let args = [
    `run`,
    `-it`,
    `-v`,
    `${process.cwd()}:/srv`
  ]

  // Forward port if defined in package.json or in commandline
  if (
    ( packageConfig.config && packageConfig.config.port ) ||
    cmdArgs.port
  ) {

    const port = ( cmdArgs.port || packageConfig.config.port )

    args = args.concat(
      '-p',
      `${port}:${port}`
    )

  }

  args = args
    .concat( `${createImageName( packageConfig )}` )
    .concat( cmdArgs.command )

  return execCommand( proc, args )

}
