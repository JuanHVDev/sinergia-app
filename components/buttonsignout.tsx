"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";

function ButtonSignOut() {
    return (
        <Button
            variant="link"
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
            Logout
        </Button>
    );
}

export default ButtonSignOut;
