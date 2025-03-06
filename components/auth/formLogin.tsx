"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import ButtonGoogle from "../google";
import { useRouter } from "next/navigation";
const formSchema = z.object({
    email: z.string().email({
        message: "Ingrese un correo electrónico válido",
    }),
    password: z.string().min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
    }),
});
const FormLogin = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;
        const router = useRouter();
        const { data, error } = await signIn.email(
            {
                email,
                password,
                callbackURL: "/dashboard",
            },
            {
                onRequest(context) {
                    toast("Iniciando Sesión");
                },
                onSuccess: async (context) => {
                    form.reset();
                    router.push("/organization/new");
                },
                onError(error) {
                    if (error.error.status === 403) {
                        toast("Correo electrónico no verificado");
                    } else {
                        toast(`${error.error.message}`);
                    }
                },
            }
        );
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="correo@ejemplo.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Iniciar sesión
                </Button>
            </form>
            <ButtonGoogle />
            <div className="flex justify-between items-center mt-2">
                <p>Olvidaste tu contraseña? </p>
                <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground"
                >
                    <span className="text-primary">Recuperar contraseña</span>
                </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
                No tienes una cuenta?{" "}
                <Link href="/register" className="text-primary">
                    Registrarse
                </Link>
            </p>
        </Form>
    );
};

export default FormLogin;
