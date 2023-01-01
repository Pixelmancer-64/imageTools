from PIL import Image
from sys import argv
from os import listdir, makedirs, path
from time import time


input = path.join(argv[1])
output = path.join(argv[2])

if not path.exists(input):
    print(f'Folder {input} does not exist!')
    exit()

if not path.exists(output):
    print(f'Creating folder {output}...')
    makedirs(output)

print(f'Reading {input}...')
timei = time()
i = 0
for file in listdir(input):
    fileName = path.splitext(file)
    if fileName[1] != f'.{argv[3]}':
        try:
            ti = time()
            Image.open(path.join(input, file)).save(path.join(output, fileName[0]+'.'+argv[3]), argv[3])
            tf = time()
            print(f'Converted {file} in {tf - ti} s')
            i += 1
        except:
            print(f'!! Could not convert {file} !!')

print(f'Conversion completed! It took {time()-timei} seconds to convert {i} files')