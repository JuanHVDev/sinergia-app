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
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import ButtonGoogle from "@/components/google";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    email: z.string().email({
        message: "Ingrese un correo electrónico válido",
    }),
    password: z.string().min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
    }),
});

const FormRegister = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, email, password } = values;
        const { data, error } = await signUp.email(
            {
                email,
                password,
                name,
                callbackURL: "/organization/new",
            },
            {
                onRequest(context) {
                    toast("Creando cuenta...");
                },
                onSuccess(context) {
                    form.reset();
                    toast("Cuenta creada con exito", {
                        description:
                            "Se te ha enviado un correo para verificar tu cuenta, por favor verifica tu correo electrónico",
                    });
                    router.push("/login");
                },
                onError(error) {
                    if (error.error.status === 403) {
                        toast.error("Correo electrónico no verificado");
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Juan Pérez" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                    Crear cuenta
                </Button>
            </form>
            <ButtonGoogle />
            <p className="text-sm text-muted-foreground mt-2">
                Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary">
                    Iniciar sesión
                </Link>
            </p>
        </Form>
    );
};

export default FormRegister;
