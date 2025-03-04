import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const { user, url, token } = await req.json();
    try {
        const { data, error } = await resend.emails.send({
            from: "Sinergia <sinergia@sinergia.com>",
            to: [user.email],
            subject: "Verificación de correo electrónico",
            react: await EmailTemplate({
                firstName: user.name,
                url: url + token,
            }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
