import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function EmailVerificationPage() {
    return (
        <div className="flex flex-col items-center justify-center grow p-4 mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-green-500">
                Email Verificado
            </h1>
            <p className="text-gray-500 mb-4">
                Tu correo electrónico ha sido verificado con éxito.
            </p>
            <Link
                href="/dashboard"
                className={buttonVariants({
                    variant: "default",
                })}
            >
                Ir a Dashboard
            </Link>
        </div>
    );
}
