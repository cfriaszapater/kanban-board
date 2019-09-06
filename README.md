# kanban-board

<https://bs-kanban-board.herokuapp.com>

Kanban board frontend, built with react + redux. Uses jwt authentication to connect to the backend API.

See the backend API at [kanban-board-backend](https://github.com/cfriaszapater/kanban-board-backend).

## Development

If you want to run it locally:

### Build

`npm install`

### Test

`npm test`

### Run

`npm start`

### Deploy to production

This is what I used to deploy to production (having an heroku account and git heroku remote set to point to it):

`git push heroku master && heroku open`

View logs:

`heroku logs --tail`

Config:

`heroku config`

## License

See [LICENSE](./LICENSE).
