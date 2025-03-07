"use client";
import {
    Form,
    FormMessage,
    FormControl,
    FormItem,
    FormLabel,
    FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgetPassword } from "@/lib/auth-client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

function FormForgotPassword() {
    const [isPending, setIsPending] = useState(false);
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
        setIsPending(true);
        const { error } = await forgetPassword({
            email: data.email,
            redirectTo: "/reset-password",
        });

        if (error) {
            toast.error("Error", {
                description: error.message,
            });
        } else {
            toast.success("Success", {
                description:
                    "If an account exists with this email, you will receive a password reset link.",
            });
        }
        setIsPending(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...field}
                                    autoComplete="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    Send Reset Link
                </Button>
            </form>
        </Form>
    );
}

export default FormForgotPassword;
