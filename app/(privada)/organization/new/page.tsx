"use client";

import CardForm from "@/components/CardForm";
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

const formSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre debe tener al menos 3 caracteres",
    }),
});

export default function NewOrganizationPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Aquí irá la lógica para crear la organización
            toast.success("Organización creada exitosamente");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Error al crear la organización");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <CardForm
                title="Crear Organización"
                description="Crea una nueva organización para gestionar tus proyectos"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nombre de la organización
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Mi Organización"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Crear Organización
                        </Button>
                    </form>
                </Form>
            </CardForm>
        </div>
    );
}
