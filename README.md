# Backend SecretHouse 

## Déploiement local

### Build 
> npm run build

Cette commande créera un dossier **dist/**, dans lequel se trouve toutes les sources.

### Start
> npm run start


### Test
**Attention:** Les tests peuvent ne pas fonctionner tous d'un coup, lancez les tests un par un.
> npm run test


### Environement
Necessite de créer un **.env** à la racine et de renseigner les champs:
```
SECRET_KEY={token secret key}
DB_NAME={Db name}
DB_PASSWORD={Db password}
DB_USER={Db user}
DB_PORT={Db port}
DB_HOST={Db host url}
```
Vous trouverez un exemple à la racine du projet dans **.env.example**

## Base de données

Touts les scripts se trouve dans **src/scripts**

### Création

> npm run create-bdd

## API en ligne:

Lien vers l'api:
https://secrethouse-api.herokuapp.com

Lien vers la doc:
https://secrethouse-api.herokuapp.com/doc

Lien vers le coverage des tests:
https://secrethouse-api.herokuapp.com/coverage





