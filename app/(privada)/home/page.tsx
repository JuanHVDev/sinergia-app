"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AppPage() {
    const router = useRouter();
    return (
        <div>
            <h1>Página privada</h1>
            <Button
                onClick={() =>
                    signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push("/login"); // redirect to login page
                            },
                        },
                    })
                }
            >
                Cerrar sesión
            </Button>
        </div>
    );
}
