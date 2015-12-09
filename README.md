Docker Managed NPM
==================

## !!! Setup Docker Toolbox on your machine first !!!

https://www.docker.com/docker-toolbox

## Install

`$ npm i soos -g`

## Init

`$ soos -i`

## Build docker image

`$ soos -b`

## Start docker machine

`$ soos`

## Start docker machine with bash shell

`$ soos -c bash`

---

```
Usage: soos [options]

Options:
  --init, -i     add dockerfile                                        [boolean]
  --build, -b    build docker machine                                  [boolean]
  --command, -c  command to run inside of docker                         [array]
  --help, -h     Show help                                             [boolean]

Examples:
  soos -i && soos -b && soos -c bash  Will build docker image and then start
                                      docker machine with bash
```
