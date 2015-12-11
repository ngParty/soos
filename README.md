[Soos - Docker Managed NPM](https://www.youtube.com/watch?v=XiuRv8RgaFk)
==================

[![Build Status](https://travis-ci.org/ngParty/soos.svg?branch=master)](https://travis-ci.org/ngParty/soos)
[![npm version](https://badge.fury.io/js/soos.svg)](https://badge.fury.io/js/soos)

## Why another strange named thingy? Why?

Because `npm install` is slow and I mean terribly slow when you try to use it properly with Docker for development.

Which means that you should run `npm install` every time you will create Docker container, or change branch, to have truly clean environment. When you have Docker images with `node_modules` baked in, you can skip this step and avoid all `npm install` issues. Only tricky part is how to build these images and how to mark them, so you, fellow developers and ci servers can reuse them and that's moment when Soon comes into the game. 

## What it does then?

Soos will do following

- Initalize `Dockerfile` and `.dockerignore` for your project
- Build docker image with `node_modules` baked in and will use shasum of `package.json` file as docker image tag, so you can easily switch between revisions ( see list of Soos own Docker images https://hub.docker.com/r/ngparty/soos/tags/ )
- Run docker container for your specific `package.json`

## !!! Setup [Docker Toolbox](https://www.docker.com/docker-toolbox) on your machine first !!!

## Install

`$ npm i soos -g`

## Init

`Your/Project $ soos -i`

## Build docker image

`Your/Project $ soos -b`

## Push/Publish docker image to [Docker Hub](http://hub.docker.com)

`Your/Project $ soos -P`

## Start docker container with npm install

`Your/Project $ soos`

## Start docker container

with `bash` shell and with forwarded port `8080`

`Your/Project $ soos -c bash -p 8080`

or

`Your/Project $ soos -s -p 8080`

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
