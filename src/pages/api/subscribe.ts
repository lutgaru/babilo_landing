export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';


// Inicializamos Resend con la variable de entorno
const resend = new Resend(import.meta.env.RESEND_API_KEY);

async function validateTurnstile(token: string, remoteip: string | undefined) {
    try {
        const response = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    secret: import.meta.env.TURNSTILE_SECRET_KEY,
                    response: token,
                    remoteip: remoteip,
                }),
            },
        );

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Turnstile validation error:", error);
        return { success: false, "error-codes": ["internal-error"] };
    }
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        if (body.hp_field) {
            return new Response(JSON.stringify({ message: 'Bot detected' }), { status: 400 });
        }

        const verifyResponse = await validateTurnstile(body.cf_token, undefined);
        console.log(verifyResponse);
        if (!verifyResponse.success) {
            return new Response(JSON.stringify({ message: 'Invalid captcha' }), { status: 403 });
        }

        const { email } = body;

        if (!email) {
            return new Response(JSON.stringify({ message: 'Email requerido' }), { status: 400 });
        }

        const { data, error } = await resend.contacts.create({
            email: email,
            audienceId: import.meta.env.RESEND_AUDIENCE_ID,
        });

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 400 });
        }

        return new Response(JSON.stringify({ message: '¡Suscrito con éxito!', data }), { status: 200 });

    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ message: 'Error interno' }), { status: 500 });
    }
};