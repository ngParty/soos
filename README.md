Docker Managed NPM
==================

## Why another strange named thingy? Why?

Because `npm install` is slow and I mean terribly slow when you try to use it properly with Docker for development.

Which means that you should run `npm install`, every time you will create Docker container or change branch to have truly clean environment. When you have Docker images with node_modules backed in you can skip this step and avoid  issues.

## What it does then?

soos will do following

- Initalize Dockerfile for your project
- Build docker image with node_modules backed in and will use shasum of `package.json` file as docker image tag, so you can easily switch between revisions
- Run docker container for your specific `package.json`

## !!! Setup Docker Toolbox on your machine first !!!

https://www.docker.com/docker-toolbox

## Install

`$ npm i soos -g`

## Init

`$ soos -i`

## Build docker image

`$ soos -b`

## Publish docker image

`$ soos -b`

## Start docker machine

`$ soos`

## Start docker machine

with `bash` shell and with forwarded port `8080`

`$ soos -c bash -p 8080`

or

`$ soos -s -p 8080`

---

```
Usage: soos [options]

Options:
  --init, -i     add dockerfile                                        [boolean]
  --build, -b    build docker image                                    [boolean]
  --push, -P     push docker image                                     [boolean]
  --command, -c  command to run inside of docker                         [array]
  --shell, -s    run bash command inside of docker                     [boolean]
  --port, -p     port forwarding                                        [string]
  --help, -h     Show help                                             [boolean]

Examples:
  soos -i && soos -b && soos -c bash  Will build docker image and then start
                                      docker machine with bash
```
