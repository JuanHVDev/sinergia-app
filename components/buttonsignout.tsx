"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";

function ButtonSignOut() {
    return (
        <Button
            asChild
            variant="outline"
            className="border-none"
            onClick={async () =>
                await signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            redirect("/login");
                        },
                    },
                })
            }
        >
            <span>Logout</span>
        </Button>
    );
}

export default ButtonSignOut;
