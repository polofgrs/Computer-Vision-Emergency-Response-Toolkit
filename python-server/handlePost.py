import cv2
import numpy as np
import base64
import sys

from Algorithms.RXDetector import RXD
from Algorithms.DXDetector import DebrisDetect
from Algorithms.AODNet import Dehaze

def handlePost(algorithm, sourcePath, targetPath, parameters):
    if targetPath == 'response':
        image = data_uri_to_cv2_img(sourcePath)
        resultImage = getattr(sys.modules[__name__], algorithm['pyFunction'])(image[1], parameters)
        uri = cv2_img_to_data_uri(image[0], resultImage[0])
        resultDict = {
            'image': uri,
            'time': resultImage[1],
            'precentage': resultImage[2]
        }
        return(resultDict)
    return('ok')


def data_uri_to_cv2_img(uri):
    # imageList = uri.split(',')
    prefix = uri.split(',')[0]
    encoded_data = uri.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return ([prefix, img])


def cv2_img_to_data_uri(prefix, resultImage):
    # print(prefix)
    type = '.' + prefix.replace(';', '/').split('/')[1]
    # print(type)
    string = base64.b64encode(cv2.imencode(type, resultImage)[1]).decode()
    return(string)
    # return(string)
