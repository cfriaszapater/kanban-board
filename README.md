# kanban-board

<https://bs-kanban-board.herokuapp.com>

Kanban board frontend, built with react + redux. Uses jwt authentication to connect to the backend API.

See the backend API at [kanban-board-backend](https://github.com/cfriaszapater/kanban-board-backend).

## Development

If you want to run it locally:

### Build

```sh
npm install
```

### Test

```sh
npm test
```

### Run

```sh
npm start
```

#### Configuration - Backend URL

Locally:

```sh
export REACT_APP_BACKEND_URL='https://bs-kanban-board-backend.herokuapp.com'
```

In heroku:

```sh
heroku config:set REACT_APP_BACKEND_URL='https://bs-kanban-board-backend.herokuapp.com'
```

### Deploy to production

This is what I used to deploy to production (having an heroku account and git heroku remote set to point to it):

```sh
git push heroku master && heroku open
```

View logs:

```sh
heroku logs --tail
```

Config:

```sh
heroku config
```

## Known issues

This project was built to practice with typescript, react, node... Maybe sometime in the future these may be improved:

- Lack of UX design / styling.
- Create your own columns: not difficult.

## License

See [LICENSE](./LICENSE).
