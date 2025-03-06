import CardForm from "@/components/CardForm";
import FormRegister from "@/components/auth/formRegister";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <CardForm
                title="Crear cuenta"
                description="Ingrese su nombre, correo y contraseña para crear una cuenta"
            >
                <FormRegister />
            </CardForm>
        </div>
    );
}
