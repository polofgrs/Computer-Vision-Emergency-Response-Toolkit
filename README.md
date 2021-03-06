# Where is the Missing Person Computer Vision Contest

Please visit [the contest website](https://computervisionrescue.wixsite.com/contest) for more information.

* [User's Manual](Documentation/users%20manual/users_manual.pdf),
* [Developer's guide](Documentation/developers%20guide/developers_guide.pdf).

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
                  SINGLE executable file
+------------------------------------------------------+
|              +-------------------------+             |
|              |        FRONT-END        |             |
|              |       Angular app       |             |
|              |        (Electron)       |             |
|              +-------------------------+             |
|              |      User Interface     |             |
|              | +---------------------+ |             |
|              | |Category 1|Category 2| |             |
|              | |          |          | |             |
|              | |          |   HTML   | |             |
|              | |   JIMP   |  canvas  | |             |
|              | |          |processing| |             |
|              | |          |          | |             |
|              | +---------------------+ |             |
|              +-------------------------+             |
|              |        Category 3       |             |
|              |                         |             |
|              |     HTTP Connexion      |==========++ |
|              +-------+--------+--------+          || |
|                      |        ^                   || |
+----------------------|--------|-------------------||-+
|  Processing request: |        | Algorithm results:|| |
|  * source image,     |        | * result image,   || |
|  * algorithm,        |        | * time,           || |
|  * parameters        |        | * percentage      || |
+----------------------|--------|-------------------||-+
|                      v        |                   || |
|               +------+--------+-------+           || |
|               |        BACK-END       |<==========++ |
|               |     Python server     |   launched   |
|               |     HTTP connexion    |   through    |
|               +-----------------------+  subprocess  |
|               |Algorithm 1|Algorithm 2|              |
|               +-----------------------+              |
|               |Algorithm 3|Algorithm 4|              |
|               +-----------------------+              |
+------------------------------------------------------+
```
* __Front-end__ : Angular App (compiled into a single executable using [Electron](https://electronjs.org/) & [Electron-builder](https://www.electron.build/)),
* __Back-end__ : Python server (compiled into a single executable using [PyInstaller](https://www.pyinstaller.org/)).

__NO FRAMEWORK INSTALLATION IS NECESSARY !__   
__THE WHOLE APP RESIDES IN A SINGLE EXECUTABLE FILE !__


Indeed, PyInstaller compiles the server into a single executable file (platform-specific), then that executable is compiled into the Electron app with the ExtraResources directory.

That will enable me to reuse all of the [original CVERT Python algorithms](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit/tree/master/Computer%20Vision%20Toolkit/Computer%20Vision%20Toolkit/lib/Algorithms), but also simplify the process of [adding a new algorithm](https://github.com/cvertdev/Computer-Vision-Emergency-Response-Toolkit/wiki/Adding-a-New-Algorithm) by simply adding the Python file, and linking it to the front end. The rest will be handled during compilation.

This way, the final user doesn't have to install ANYTHING, just launch the executable file. (He can also install the software just like any other software, through an installer, then find it later on, on his OS).

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
* [Three.js](https://threejs.org/),
* [usng.js](https://www.npmjs.com/package/usng.js)

*You can find all of the npm libraries in [package.json](CVERT-ng/package.json).*

__Back-end:__   
[Python 3.6](https://www.python.org/) running a web server to handle image processing requests.   
It uses the following dev libraries:
* [PyInstaller](https://www.pyinstaller.org/),
* [pip3](https://pip.pypa.io/en/stable/).

And the following prod libraries:
* [Flask](https://palletsprojects.com/p/flask/),
* All the [necessary libraries](python-server/requirements.txt) for the image processing algorithms.

## For developers :
__NOTE:__ *I am a Linux user. You might need to look around for equivalent Windows or Mac commands and installation processes...*

### Front-end
Install __NodeJS__ (that will automatically install __npm__), and [Angular](https://angular.io/guide/setup-local). Then:
```bash
git clone https://github.com/polofgrs/Computer-Vision-Emergency-Response-Toolkit.git
cd CVERT-ng
npm i
npm run electron
```
Then, if you want to compile the Electron project into an executable file on your OS :
```bash
./node_modules/.bin/electron-builder
```
### Back-end
Install [Python 3.6](https://www.python.org/), then the packages in [requirements.txt](python-server/requirements.txt) with `pip3`, then run the server:
```bash
sudo apt-get install pyhton3-pip
cd python-server
pip3 install -r requirements.txt
python3 server.py
```
And to compile it :
```bash
pyinstaller server.spec
```
### Additional notes for developers
* __NOTE 1:__ *You HAVE to run `npm run electron` before running electron-builder, otherwise you will not have the updated files in `/dist`.*

* __NOTE 2:__ *In case you want to compile the electron-builder app, you HAVE to have the compiled executable server files in `/python-server/dist/` (by running PyInstaller) for the OS you are developing on/for.*

* __NOTE 3:__ *In case you are developing a Python function and would like to try it out without using `npm run electron` for the front-end, you can still launch the front-end compiled app, and set up the server to communicate with your local python development server on an other port (bottom left panel). The other server (default port 5000) will still be running, but should not cause any trouble. (just make sure to change your server port in `server.py`, and to launch it manually).*
