import { env } from "$env/dynamic/private";
import Auth from "@auth/core/providers/auth0";
import GitHub from "@auth/core/providers/github";
import { SvelteKitAuth } from "@auth/sveltekit";
import { ManagementClient } from "auth0";

export const handle = SvelteKitAuth({
  providers: [
    GitHub({ clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET }),
    Auth({
      clientId: env.AUTH0_ID,
      clientSecret: env.AUTH0_SECRET,
      issuer: "https://" + env.AUTH0_DOMAIN
    }),
  ],
})

export const Auth0Management = new ManagementClient({
    domain: env.AUTH0_DOMAIN,
    clientId: env.AUTH0_API_ID,
    clientSecret: env.AUTH0_API_SECRET,
});
