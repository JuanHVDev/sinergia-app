import { betterAuth, BetterAuthOptions, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { sendEmail } from "@/actions/email";
import { organization } from "better-auth/plugins";
import { getSubscription } from "@/actions/organization";
import { Organization } from "@prisma/client";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    user: {
        additionalFields: {
            subscription: {
                type: "string",
                required: false,
            },
        },
    },

    plugins: [
        organization({
            organizationLimit: async (user: User | undefined) => {
                if (!user) return false;
                const subscription = await getSubscription(user.id);
                return subscription === "FREE"
                    ? 2
                    : subscription === "PRO"
                      ? 4
                      : 10;
            },
            membershipLimit: async (organization: Organization) => {
                if (!organization) return 0;
                const subscription = await getSubscription(organization.id);
                return subscription === "FREE"
                    ? 1
                    : subscription === "PRO"
                      ? 10
                      : 100;
            },
            allowUserToCreateOrganization: async (user) => {
                const subscription = await getSubscription(user.id);
                const organizations = await prisma.organization.count({
                    where: {
                        members: {
                            some: {
                                userId: user.id,
                            },
                        },
                    },
                });

                if (subscription === "FREE" && organizations >= 2) {
                    return false;
                }

                if (subscription === "PRO" && organizations >= 4) {
                    return false;
                }

                if (subscription === "ENTERPRISE" && organizations >= 10) {
                    return false;
                }

                return true;
            },
        }),
    ],
    session: {
        expiresIn: 24 * 60 * 60 * 7,
        updateAge: 24 * 60 * 60 * 7,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({
            user,
            url,
        }: {
            user: User;
            url: string;
        }) => {
            await sendEmail(user, url, "Reinicio de contraseña");
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
            await sendEmail(
                user,
                verificationUrl,
                "Verificación de correo electrónico"
            );
        },
        expiresIn: 24 * 60 * 60 * 7,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
