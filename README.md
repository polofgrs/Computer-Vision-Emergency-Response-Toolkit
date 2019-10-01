# Where is the Missing Person Computer Vision Contest

Please visit [the contest website](https://computervisionrescue.wixsite.com/contest) for more information.

__IMPORTANT NOTE:__   
This readme is in progress. Most of the information below is a general idea of what I'd like to do, and the present code and development process might not work. I will update this readme as frequently as possible.

## Introduction
I basically first thought that C# code from [the initial repository](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit) was not a great ides, for the following reasons :
* Not really user-friendly,
* Limited only to Windows Platforms,
* Python packages and .NET framework need to be installed (almost) manually.   

*(Also, I'm very bad at C# coding...)*  
That is why I decided to take an other direction :

## My idea

I am IN LOVE with a particular HTML / CSS / Javascript (Typescript) framework, [Angular](https://angular.io), for the following reasons :
* Web-based frameworks are extremely user-friendly,
* [NPM](https://www.npmjs.com/) is full of AMAZING copyright-free libraries,
* [Electron](https://electronjs.org/) enables you to compile ANY Angular project into desktop apps for all Windows, Mac and Linux platforms with [Electron-builder](https://www.electron.build/), (just like [Ionic](https://ionicframework.com) for mobile app versions),
* [Typescript](http://www.typescriptlang.org/) as a GREAT web-based language that enables you to interface your app with any running server (see below).

### Software architecture
I decided to use the following architecture for my software :

```
            +-------------------------+
            |        FRONT-END        |
            |       Angular app       |
            |        (Electron)       |
            +-------------------------+
            |      User Interface     |
            | +---------------------+ |
            | |Category 1|Category 2| |
            | |          |          | |
            | |          |   HTML   | |
            | |   JIMP   |  canvas  | |
            | |          |processing| |
            | |          |          | |
            | +---------------------+ |
            +-------------------------+
            |        Category 3       |
            |                         |
            |      UDP Connexion      |
            +-------+--------+--------+
                    |        ^
                    |        |
Processing request: |        | Algorithm results:
* source image,     |        | * result image,
* algorithm,        |        | * time,
* parameters        |        | * percentage
                    |        |
                    v        |
             +------+--------+-------+
             |   BACK-END (optional) |
             |     Python server     |
             |     UDP connexion     |
             +-----------------------+
             |Algorithm 1|Algorithm 2|
             +-----------------------+
             |Algorithm 3|Algorithm 4|
             +-----------------------+
```
* __Front-end__ : Angular App (compiled into a single executable using [Electron](https://electronjs.org/) & [Electron-builder](https://www.electron.build/)),
* __Back-end__ : Python server (compiled into a single executable using [PyInstaller](https://www.pyinstaller.org/)).

__All you need to do is download the two executable files, and launch them individually !__   
__NO OTHER FRAMEWORK INSTALLATION IS NECESSARY !__

Indeed, Electron and PyInstaller compile All of the necessary libraries into a single-file executable, so the user doesn't have to install any framework.

*Also, the Python server back-end is only necessary if you want to use the category 3 algorithms. For fairly simple image processing, the front-end can handle it using [Jimp](https://www.npmjs.com/package/jimp).*

That will enable me to reuse all of the [original CVERT Python algorithms](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit/tree/master/Computer%20Vision%20Toolkit/Computer%20Vision%20Toolkit/lib/Algorithms), but also simplify the process of [adding a new algorithm](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit/wiki/Adding-a-New-Algorithm) by simply adding the Python file, and linking it to the front end.

### Used libraries and packages
__Front-end:__   
[Node](https://nodejs.org/en/) & [npm](https://www.npmjs.com/), with the following libraries:
* [Angular](https://angular.io),
* [Angular Material](https://material.angular.io/),
* [Electron](https://electronjs.org/),
* [Electron-builder](https://www.electron.build/),
* [Jimp](https://www.npmjs.com/package/jimp),
* [Chart.js](https://www.chartjs.org/),

__Back-end:__   
[Python 3.6](https://www.python.org/) running a web server to handle image processing requests.   
It uses the following libraries:
* [Socket](https://docs.python.org/3/library/socket.html),
* [PyInstaller](https://www.pyinstaller.org/),
* All the [necessary libraries](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit) for the image processing algorithms.

## For developers :
__NOTE:__ *I am a Linux user. You might need to look around for equivalent Windows or Mac commands and installation processes...*

__Front-end:__   
Install __NodeJS__ (that will automatically install __npm__), and [Angular](https://angular.io/guide/setup-local). Then:
```bash
git clone https://github.com/polofgrs/Computer-Vision-Emergency-Response-Toolkit.git
cd CVERT-ng
npm i
npm run electron
```
__Back-end:__   
Install [Python 3.6](https://www.python.org/), then the packages in `/python-server/packages.py` *(not yet implemented)*, then run the server with :
```bash
cd python-server
python3 server.py
```
