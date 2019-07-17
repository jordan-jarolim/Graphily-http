# Http Log to Json to Graph

## Used libs
- nextjs
- reactjs
- express
- babel
- docker
- material-ui

## How to run
### Inline script
You can run inline script without any installation. You just need to have latest node on you machine. Run it from root directory as
```
node ./scripts/log2json/l2j-cli.js
```
Result will be saved as `result.json` in `./static` folder. You can also specify relative paths to running script for input/output files as
```
node ./scripts/log2json/l2j-cli.js ../../static/epa-http.txt ../../static/result.json
```
### Web application
You can run as standard js-based application (see package.json) or you can use prepared docker image.
Build docker image first:
```
docker build --tag=http2graph .
```
Then run container:
```
docker run -p 3000:3000 http2graph
```

## Time spent
- bootstrap app (next, eslint, babel, express, helmet) - 1.5h
- material ui, scss - 1h
- parsing log to json (got stuck on regexes even there's much easier way :-))- 4h
- output, code cleanup, tests, jsdoc - 3h
- graph filtering, endpoints, visualisation, docker - 7h