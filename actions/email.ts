"use server";

import { EmailTemplate } from "@/components/email-template";
import { User } from "better-auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(user: User, url: string, subject: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Sinergia App <sinergia@juanhv-medicodev.org>",
            to: [user.email],
            subject,
            react: await EmailTemplate({
                name: user.name,
                url,
            }),
        });

        if (error) {
            return { error };
        }

        return { data };
    } catch (error) {
        console.error(error);
    }
}
