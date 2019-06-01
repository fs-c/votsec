### `votsec/app`

```bash
$ cd app/
# Install the dependencies
$ npm install
# Start the dev-server, only for development and testing!
$ npm start
# Build production files in ./build/
$ npm run build
```

Never ever run `npm start` on your production servers. To host the frontend, build the app using `npm run build` and host the resulting files using a properly configured Web server such as [nginx](https://www.nginx.com/) (more on nginx [installation](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04), [configuration](https://www.digitalocean.com/community/tutorials/nginx-essentials-installation-and-configuration-troubleshooting), and [optimization](https://www.digitalocean.com/community/tutorials/how-to-optimize-nginx-configuration)).

---

Bootstrapped using a modified version of [`create-react-app`](https://github.com/LW2904/create-react-app) to allow inclusion of the config file which resides outside of the `src/` directory.
