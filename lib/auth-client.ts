import { createAuthClient } from "better-auth/react";
import { organization } from "better-auth/plugins";
export const {
    signIn,
    signUp,
    useSession,
    signOut,
    forgetPassword,
    resetPassword,
} = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL, // the base url of your auth server
    plugins: [organization()],
});
