# iiek: An IITK flavoured esolang

I don't remember why I decided to build this. Considering that the commits are from January 2021, when I was the coordinator of [PClubIITK](https://github.com/pclubiitk)
and the Y20 batch had just arrived, I think it might have been my wish to conduct BlackBox for them in an IITK flavoured language? Anyway, the implementation is
not complete AFAIR, but the sample programs work, so I think it is definitely possible to build some simple programs in this language.

## Comments

 - I chose typescript for this esolang to enable hosting an online compiler/interpreter/whatever for it without needing a backend service.
 - The strange decision to require an input file instead of reading from stdin was also probably taken because of the above mentioned reason.
 - I am bad at naming things. I have no recollection at all of why this is called iiek.
 - I don't intent to finish implementing this as of now because there is a new (and probably better) esolang recently built by PClubIITK: [IITK-Traveller](https://github.com/pclubiitk/IITK-Traveller)

## Build

Install typescript if not yet present (idk why I didn't add it to the project) (also, use npx if you wish)
```
npm i -g typescript
```

Run tsc in the project root directory:
```
tsc
```

This will create a `build` directory.

## Running

Inside the build directory you'll find index.js. Run programs as follows:

### Example without input file:
```
node build/index.js samples/print3randoms.iiek
```

### Example with input file:
```
node build/index.js samples/echo.iiek samples/input.txt
```
