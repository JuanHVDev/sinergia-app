import { Button } from "@/components/ui/button";

export default function ProyectosPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Proyectos</h1>
                
                <Button>Crear proyecto</Button>
            </div>
        </div>
    );
}
