# Remember the Pokémon?
A game for testing whether you remember the Pokémon! You can try it out [here](http://remember-the-pokemon.s3-website-eu-west-1.amazonaws.com/). For best experience, use a non-mobile device (laptop, desktop).

Built with SvelteKit.

## Developing
After running `npm install` you can
```
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building
You can build a production app with `npm run build`. Currently configured to build a static site, which can be deployed to e.g. S3 by running `aws s3 sync build s3://<bucket name>/` and enabling static website hosting on the bucket.
 