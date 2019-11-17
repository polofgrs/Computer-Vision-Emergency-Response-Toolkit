import timer
from libxmp import XMPFiles
import bs4
import cv2
import math

def GpsFetch(sourcePath, targetPath, gpsTarget):
    t = timer.Timer()
    t.start()

    for i in range(0, len(sourcePath)):
        path = sourcePath[i]
        xmp = getXMP(path)
        if xmp is None:
            print('ignoring ' + sourcePath[i])
        else:
            pixels = findPixel(xmp, gpsTarget)
            if pixels is not None:
                print('GPS intersecting ' + sourcePath[i])
                image = drawCircle(sourcePath[i], pixels)
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
        return resultDict
    except AttributeError as e:
        print(e)
        print("No XMP data found for " + path)
        return

def findPixel(xmp, gpsTarget):
    # will check if gpsTarget is in the picture (with XMP)
    # If it is found, returns (x, y) in pixels to draw to the picture
    # else, returns None
    # https://www.movable-type.co.uk/scripts/latlong.html
    radius = 6371000  # earth radius

    # distance (in m)
    lat1 = math.radians(xmp['latitude'])
    lat2 = math.radians(gpsTarget['latitude'])
    dlat = math.radians(gpsTarget['latitude'] - xmp['latitude'])
    dlon = math.radians(gpsTarget['longitude'] - xmp['longitude'])
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = radius * c
    # Should add altitude as well !

    # bearing (in rad)
    y = math.sin(dlon) * math.cos(lat2)
    x = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * math.cos(lat2) * math.cos(dlon)
    bearing = math.atan2(y, x)

    # not enough !

    # idea : construct 2 vectors :
    # - 1 for the camera direction
    # - 1 for the vamera to target.
    # compute the 2 angles from the camera
    # convert them to image pixels

    print(distance)
    print(math.degrees(bearing))

    if distance < 1000:  # otherwise, too far
        relativeHdg = (math.degrees(bearing) - xmp['heading']) / (gpsTarget['fov'] / 2)
        print(relativeHdg)

    return

def drawCircle(path, pixels):
    # returns image with circle at the specified position
    image = cv2.imread(path)
    dimensions = image.shape
    radius = dimensions[1] // 50  # width // 20
    center = (pixels[0], pixels[1])
    image = cv2.circle(image, center, radius, (0, 0, 255), -1)
    return image

def saveImage(image, sourcePath, targetPath):
    # saves image at the specified path (with modified name)
    pathSplit = sourcePath.split("/")
    filePath = targetPath + '/intersect-' + pathSplit[len(pathSplit) - 1]
    cv2.imwrite(filePath, image)
    return
