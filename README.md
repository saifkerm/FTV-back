# FDJ BACK END
Technical test for FDJ.

### How to start server
```sh
npm install
docker compose up
npm run start
```

### How to start test
```sh
npm run test
```

### API List :

| Leagues           | Path                     |
|-------------------|--------------------------|
| All leagues       | /leagues                 |
| Search leagues    | /leagues/search/:name    |
| Get league by _id | /leagues/_id/:id         |



| Teams                      | Path               |
|----------------------------|--------------------|
| Get all teams              | /teams             |
| Get all players of a team  | /teams/players/:id |