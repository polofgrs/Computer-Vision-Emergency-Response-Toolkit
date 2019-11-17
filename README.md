# Where is the Missing Person Computer Vision Contest

Please visit [the contest website](https://computervisionrescue.wixsite.com/contest) for more information.

__IMPORTANT NOTE:__   
This readme is in progress. Most of the information below is a general idea of what I'd like to do, and the present code and development process might not work. I will update this readme as frequently as possible.

## Introduction
I basically first thought that C# code from [the initial repository](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit) was not a great idea, for the following reasons :
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

#### Right now :
I decided to use the following architecture for my software :

```
                     cvert.exe
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
            |     HTTP Connexion      |
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
             |     HTTP connexion    |
             +-----------------------+
             |Algorithm 1|Algorithm 2|
             +-----------------------+
             |Algorithm 3|Algorithm 4|
             +-----------------------+
                     server.exe
```
* __Front-end__ : Angular App (compiled into a single executable using [Electron](https://electronjs.org/) & [Electron-builder](https://www.electron.build/)),
* __Back-end__ : Python server (compiled into a single executable using [PyInstaller](https://www.pyinstaller.org/)).

You Need to download and launch the two executables individually :
* `cvert.exe` for the main software GUI (Electron Angular GUI),
* `server.exe` for the advanced filters (PyInstaller Python server)

__NO FRAMEWORK INSTALLATION IS NECESSARY !__

Indeed, Electron and PyInstaller compile All of the necessary libraries into a single-file executable, so the user doesn't have to install any framework.

*Also, the Python server back-end is only necessary if you want to use the category 3 algorithms. For fairly simple image processing, the front-end can handle it using [Jimp](https://www.npmjs.com/package/jimp).*

That will enable me to reuse all of the [original CVERT Python algorithms](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit/tree/master/Computer%20Vision%20Toolkit/Computer%20Vision%20Toolkit/lib/Algorithms), but also simplify the process of [adding a new algorithm](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit/wiki/Adding-a-New-Algorithm) by simply adding the Python file, and linking it to the front end.

#### In the future
I plan on compiling the server executable __INSIDE__ the front-end executable, so the front-end can launch the server on its own in a sub-process, and the user doesn't have to launch two programs:

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
                              |      TCP Connexion      |
            +=================+-------+--------+--------+
            ||                        |        ^
START :     ||                        |        |
launches    ||    Processing request: |        | Algorithm results:
subprocess  ||    * source image,     |Zerorpc?| * result image,
on startup  ||    * algorithm,        |        | * time,
            ||    * parameters        |        | * percentage
            ||                        |        |
            ||                        v        |
            +================> +------+--------+-------+
                               |   BACK-END (optional) |
                               |     Python server     |
                               |     TCP connexion     |
                               +-----------------------+
                               |Algorithm 1|Algorithm 2|
                               +-----------------------+
                               |Algorithm 3|Algorithm 4|
                               +-----------------------+  
```
In this case, First, the server can be compiled into a `server.exe`, then this one can be compiled and started from node as an asset. All the code, with its assets can be compiled into the `cvert.exe` executable via Electron-builder, just like in [this example](https://medium.com/@abulka/electron-python-4e8c807bfa5e).

__This way, the user will only need to launch a single executable files, with all dependencies included !__

### Used libraries and packages
__Front-end:__   
[Node](https://nodejs.org/en/) & [npm](https://www.npmjs.com/), with the following dev libraries:
* [Angular](https://angular.io),
* [Electron](https://electronjs.org/),
* [Electron-builder](https://www.electron.build/),

And the following prod libraries:
* [Angular Material](https://material.angular.io/),
* [Bootstrap](https://getbootstrap.com/),
* [Jimp](https://www.npmjs.com/package/jimp),
* [Exifr](https://www.npmjs.com/package/exifr),
* [Fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser),
* [Chart.js](https://www.chartjs.org/),
* [Three.js](https://threejs.org/)

*You can find all of the npm libraries in [package.json](CVERT-ng/package.json).*

__Back-end:__   
[Python 3.6](https://www.python.org/) running a web server to handle image processing requests.   
It uses the following dev libraries:
* [PyInstaller](https://www.pyinstaller.org/),
* [pip3](https://pip.pypa.io/en/stable/);

And the foollowing prod libraries:
* [Flask](https://palletsprojects.com/p/flask/),
* All the [necessary libraries](python-server/requirements.txt) for the image processing algorithms.

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
Install [Python 3.6](https://www.python.org/), then the packages in [requirements.txt](python-server/requirements.txt), then run the server:
```bash
sudo apt-get install pyhton3-pip
cd python-server
pip3 install -r requirements.txt
python3 server.py
```
