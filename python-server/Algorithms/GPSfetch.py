import timer
from libxmp import XMPFiles
import bs4

def GpsFetch(sourcePath, targetPath, gpsTarget):
    t = timer.Timer()
    t.start()

    for i in range(0, len(sourcePath)):
        path = sourcePath[i]
        xmp = getXMP(path)
        if xmp is None:
            print('ignoring ' + sourcePath[i])
        else:
            # here, put the logic
            pixels = findPixel(xmp, gpsTarget)
            if pixels is not None:
                print('GPS intersecting ' + sourcePath[i])
                image = drawCross(sourcePath[i], pixels)
                saveImage(image, sourcePath[i], targetPath)
            else:
                print('GPS not intersecting ' + sourcePath[i])

    t.stop()
    return t.get_time()

def getXMP(path):
    # extracts XMP data from picture
    # if no XMP data is found, returns None
    xmpfile = XMPFiles(file_path=path, open_forupdate=True)
    xmp = xmpfile.get_xmp()
    soup = bs4.BeautifulSoup(str(xmp), 'html.parser')
    xdimension = int(soup.find('exif:pixelxdimension').string)
    ydimension = int(soup.find('exif:pixelydimension').string)
    print(xdimension)
    print(ydimension)
    try:
        altitude = float(soup.find('drone-dji:relativealtitude').string)
        latitude = float(soup.find('drone-dji:gpslatitude').string)
        heading = float(soup.find('drone-dji:gimbalyawdegree').string)
        pitch = float(soup.find('drone-dji:gimbalpitchdegree').string)
        try:  # thank you DJI for the typo...
            longitude = float(soup.find('drone-dji:gpslongitude').string)
        except Exception:
            longitude = float(soup.find('drone-dji:gpslongtitude').string)
        print("XMP found for " + path)
        resultDict = {
            "xdimension": xdimension,
            "ydimension": ydimension,
            "altitude": altitude,
            "latitude": latitude,
            "longitude": longitude,
            "heading": heading,
            "pitch": pitch
        }
        print(resultDict)
        return resultDict
    except AttributeError as e:
        print(e)
        print("No XMP data found for " + path)
        return

def findPixel(xmp, gpsTarget):
    # will check if gpsTarget is in the picture (with XMP)
    # If it is found, returns (x, y) in pixels to draw to the picture
    # else, returns None
    return

def drawCross(path, pixels):
    # this function will draw a cross at the specified pixel position
    # on the image at the specified path
    # then it will return the image
    return

def saveImage(image, sourcePath, targetPath):
    # this function will take an image (ex. from drawcross),
    # define its new name (appended)
    # then save it at the targetPath folder
    return
