# Deployment instructions

Populate `.env` with:

```env
FIREBASE_CREDENTIALS=credentials.json
DATABASE_URL={the firebase url}
TKTZ_API_URL=https://api.tzkt.io/ # or https://api.ghostnet.tzkt.io/
CONTRACT_FACTORY_ADDRESS={contract_factory_address} # if planning to update the Firebase database
```

Then, put the credentials.json from the Firebase Realtime Database in ./credentials/

Finally, run:

```sh
docker_compose up
```

## Updating the database

```sh
source .env
cd app/ && python -m updater.update_firebase
```
