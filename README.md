# Newman reporter msgs

A Newman reporter that dumps to stdout the raw http messages involved in
the newman run execution

## Hack

### Install nvm and node
```sh
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
sh install_nvm.sh
source ~/.profile
nvm install -lts
```

### Install globally newman
```sh
npm i -g newman
```

### Pack from sources and deploy
```sh
npm pack
npm i -g newman-reporter-msgs-<version>.tgz
```

## Execute newman with this reporter
```sh
newman run -e <path/to/environment.json> <path/to/collection.json> -r msgs
```

The resultant http messages exchanges will be shown in console

### Options
You can use the flag *--reporter-msgs-native* to use the OS native 
line break instead of the default CRLF (\r\n)

## Testing

Execute tests by running
```sh
npm test
```
