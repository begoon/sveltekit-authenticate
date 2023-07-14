import { env } from "$env/dynamic/private";
import Auth from "@auth/core/providers/auth0";
import GitHub from "@auth/core/providers/github";
import { SvelteKitAuth } from "@auth/sveltekit";
import { ManagementClient, type User } from "auth0";

export const handle = SvelteKitAuth({
    providers: [
        GitHub({ clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET }),
        Auth({
            clientId: env.AUTH0_ID,
            clientSecret: env.AUTH0_SECRET,
            issuer: "https://" + env.AUTH0_DOMAIN,
        }),
    ],
    callbacks: {
        async signIn(params) {
            console.log("signIn", params);
            if (params.account?.provider === "auth0") {
                const sub = params.profile?.sub || "?";
                const roles = await Auth0Management.getUserRoles({
                    id: sub,
                });
                console.log("roles", roles);
            }
            return true;
        },
        async session({ session }) {
            console.log("session", session);
            const email = session.user?.email || "?";
            const users = await Auth0Management.getUsersByEmail(email);
            console.log("users", users);
            if (users.length > 0) {
                const roles = await Auth0Management.getUserRoles({
                    id: users[0].user_id || "?",
                });
                const names = roles?.map(({ name }) => name || "?");
                const user = session.user as User & { roles?: string[] };
                user.roles = names;
            }
            return session;
        },
    },
});

export const Auth0Management = new ManagementClient({
    domain: env.AUTH0_DOMAIN,
    clientId: env.AUTH0_API_ID,
    clientSecret: env.AUTH0_API_SECRET,
});
