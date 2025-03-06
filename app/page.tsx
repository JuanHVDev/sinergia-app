import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });
    console.log(session);
    if (session) {
        redirect("/organization");
    }
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center py-12">
                <Link href="#" className="flex items-center justify-center">
                    {/* <Image src="/logo.svg" alt="logo" width={40} height={40} /> */}
                    <span className="ml-2 text-2xl font-bold">Sinergia</span>
                </Link>
                <nav className="ml-auto flex items-center gap-6 sm:gap-8 font-medium">
                    <Link
                        href="#"
                        className="text-sm hover:underline underline-offset-4"
                    >
                        Caracteristicas
                    </Link>
                    <Link
                        href="#"
                        className="text-sm hover:underline underline-offset-4"
                    >
                        Precio
                    </Link>
                    <Link
                        href="#"
                        className="text-sm hover:underline underline-offset-4"
                    >
                        Contacto
                    </Link>
                    <Link
                        href="#"
                        className="text-sm hover:underline underline-offset-4"
                    >
                        Sobre
                    </Link>
                    <Button>
                        <Link href="/login">Acceder</Link>
                    </Button>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Organiza tu vida con Sinergia
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Sinergia es la app de organización más
                                    avanzada que te ayuda a gestionar tus
                                    tareas, proyectos, objetivos y tu vida.
                                    Mantente en el top de tus objetivos con
                                    facilidad.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button>
                                    <Link href="/register">Comienza Ya</Link>
                                </Button>
                                <Button variant="outline">
                                    Más Información
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
