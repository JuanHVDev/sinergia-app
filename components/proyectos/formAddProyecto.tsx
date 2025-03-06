"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormMessage,
    FormControl,
    FormLabel,
    FormItem,
    FormField,
    FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import CoverComponent from "./coverComponent";
import { useState } from "react";

const defaultCover = `https://avatar.vercel.sh/j`;
const defaultIcon = `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4a4.png`;

const formAddProyectoSchema = z.object({
    nombre: z
        .string()
        .min(1, { message: "El nombre es requerido" })
        .max(50, { message: "El nombre debe tener menos de 50 caracteres" }),
    descripcion: z
        .string()
        .min(10, { message: "La descripción es requerida" })
        .max(100, {
            message: "La descripción debe tener menos de 100 caracteres",
        })
        .optional(),
});

function FormAddProyecto() {
    const [cover, setCover] = useState<string | File>(defaultCover);
    const [icon, setIcon] = useState(defaultIcon);
    const form = useForm<z.infer<typeof formAddProyectoSchema>>({
        resolver: zodResolver(formAddProyectoSchema),
        defaultValues: {
            nombre: "",
            descripcion: "",
        },
    });
    function onSubmit(values: z.infer<typeof formAddProyectoSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="py-10 space-y-8 max-w-3xl mx-auto"
            >
                <h1 className="text-2xl font-bold mx-10 my-10">
                    Crea un Proyecto
                </h1>
                <div className="py-5 space-y-1">
                    <FormLabel>Cover</FormLabel>
                    <CoverComponent
                        cover={cover}
                        icon={icon}
                        setCover={setCover}
                        setIcon={setIcon}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Nombre</FormLabel>
                            <FormControl className="w-full">
                                <Input
                                    placeholder="Ej. Mi Proyecto"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Escribe el Nombre de tu Proyecto
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ej. Mi proyecto es sobre tareas de la escuela"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Describe sobre que trata tu proyecto
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default FormAddProyecto;
