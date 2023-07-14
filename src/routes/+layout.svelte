<script lang="ts">
    import { page } from "$app/stores";
    import type { User } from "@auth/core/types";

    const user = $page.data.session?.user as User & { roles: string[] };
</script>

{#if $page.data.session}
    {#if user?.image}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={user.image} />
    {/if}
    <strong>{user?.email ?? user?.name}</strong>
    {user?.roles}
    <p />
    <a href="/auth/signout" data-sveltekit-preload-data="off">Sign out</a>
{:else}
    <span>You are not signed in</span> -
    <a href="/auth/signin" data-sveltekit-preload-data="off">Sign in</a>
{/if}
<nav>
    <menu>
        <li><a href="/">Home</a></li>
        <li><a href="/protected">Protected</a></li>
    </menu>
</nav>
<slot />

<style>
    img {
        max-width: 50px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
