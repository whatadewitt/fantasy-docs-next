# fantasy-docs-next

Documentation site for [`yahoo-fantasy`](https://www.npmjs.com/package/yahoo-fantasy), a Node.js wrapper for the [Yahoo! Fantasy Sports API](https://developer.yahoo.com/fantasysports/guide/index.html). The library itself lives at [whatadewitt/yahoo-fantasy-sports-api](https://github.com/whatadewitt/yahoo-fantasy-sports-api).

The site documents every resource and collection method. Once you sign in with Yahoo, you can run each method against your own fantasy data right from the docs.

Built with Next.js 14 (Pages Router), React 18 and Sass modules. It deploys to Vercel.

## Requirements

- Node.js 22 (see `.nvmrc`; run `nvm use`)
- A Yahoo Developer app with a client ID and secret ([create one here](https://developer.yahoo.com/apps/)). Its redirect URI must be `https://<APP_URL>/auth/callback`.

## Getting started

```bash
npm install
```

Create a `.env` file in the project root:

```bash
YAHOO_CLIENT_ID=your-client-id
YAHOO_CLIENT_SECRET=your-client-secret
APP_URL=localhost:3000   # host only, no protocol; used to build the OAuth callback URL
```

Yahoo requires an HTTPS redirect URI, so run the dev server over HTTPS:

```bash
npm run dev:https
```

Then open [https://localhost:3000](https://localhost:3000).

## Scripts

| Script              | Description                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`       | Next.js dev server over HTTP. The docs pages work, but Yahoo auth won't.                                                                                    |
| `npm run dev:https` | Next.js dev server with a self-signed certificate. Use this when you need auth.                                                                          |
| `npm run dev:local` | Runs `server.js`, a custom HTTPS server on port 443 with the Node inspector attached. It needs `certificates/localhost.{key,crt}`. Both paths are gitignored, so you have to create them locally. |
| `npm run build`     | Production build.                                                                                                                                        |
| `npm start`         | Serve the production build.                                                                                                                              |

## Project structure

```
pages/
  index.js, changelog.js    Home and changelog pages
  resource/<name>/          Docs for resource methods (game, league, player, team, roster, transaction, user)
  collection/<name>/        Docs for collection methods (games, leagues, players, teams, transactions)
  auth/callback.js          OAuth landing page
  api/auth.js               Starts the Yahoo OAuth flow
  api/auth/callback.js      Exchanges the code for tokens and sets httpOnly cookies
  api/auth/me.js            Returns the signed-in user
  api/logout.js             Clears the auth cookies
  api/yahoo/[[...slug]].js  Proxies /api/yahoo/<resource>/<method> to yahoo-fantasy
components/                 UI, plus a component per documented resource and collection
context/, reducers/         User auth state
services/api.js             Client-side helpers for calling the API routes
```

## How the "try it" feature works

1. The user clicks sign in. `/api/auth` redirects to Yahoo.
2. Yahoo redirects back to `/auth/callback`. The callback exchanges the code for tokens and stores `accessToken` and `refreshToken` as httpOnly cookies.
3. The docs components POST to `/api/yahoo/<resource>/<method>` with the method's arguments. The route calls the matching `yahoo-fantasy` method as the signed-in user and returns the JSON.

## Releasing a new version

When `yahoo-fantasy` ships a new version:

1. Bump `yahoo-fantasy` and the site `version` in `package.json` to match.
2. Add an entry to `components/Changelog/Changelog.js`.
3. Update or add docs for any new or changed methods.

## Deployment

The site deploys to Vercel. Set `YAHOO_CLIENT_ID`, `YAHOO_CLIENT_SECRET` and `APP_URL` (the production host) in the Vercel project's environment variables, and add the production callback URL to your Yahoo app.

## License

MIT
