## Lightning Hacks Timer

The timer for the lightning hacks initiative, powered by IMEsec.
You can use it on this site: https://timer.imesec.ime.usp.br

### Requirements

- `npm` or `yarn` (`npm i -g yarn`)
- `docker` for production builds
- `make` for production builds

### How to develop -- build

1. Clone this repository. `git clone https://github.com/IMESec-USP/lightning-hacks-timer.git`
2. Run `npm i` or `yarn` on the directory.
3. Run `make` or `npm start` or `yarn start`.

### How to build -- production

1. Clone this repository. `git clone https://github.com/IMESec-USP/lightning-hacks-timer.git`
2. Run `npm i` or `yarn`.
3. Run `make build`. This builds a docker image called `timer`.
4. Run the image by using `docker run -P timer`.