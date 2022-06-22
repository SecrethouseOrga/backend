# Backend SecretHouse 

## Base de donnée

### Identifiants
_Infos sur le discord._

### Création
Dans ***secrethouse-backend/functions*** :

Reférencer chaque entité dans la config de l'orm ***mikroOrm.config.ts***:
> entities: [User, Author, etc, ...]

Pour créer la base de données et les tables correspondantes :

Build l'application
> npm run build

Lancer le script de création:
> node lib/bdd/createDb.js
## Dev Local
### Firebase tools
Nécessite d'installer firebase cli avec :`npm install -g firebase-tools`

Pour lancer le projet en local :
`firebase serve`

### Environement
Necessite de créer un **.env** et de renseigner les champs:
```
SECRET_KEY={token secret key}
DB_NAME={Db name}
DB_PASSWORD={Db password}
DB_USER={Db user}
DB_PORT={Db port}
DB_HOST={Db host url}
```
## Déploiement

Pour release une feature ou un fix :
- Écrire votre code et le tester
- Ouvrir une PR sur le projet github.
- Attendre un approved
- Merge dans `main`
- Une nouvelle PR pour la release est créé qui devra être approved et merge également pour déclencher le :
  - Le CI automatisera la release + déploiement sur firebase.

f
