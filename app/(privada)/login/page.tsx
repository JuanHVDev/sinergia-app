import CardForm from "@/components/CardForm";
import FormLogin from "@/components/formLogin";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <CardForm
                title="Iniciar sesión"
                description="Ingrese su correo y contraseña para acceder a su cuenta"
            >
                <FormLogin />
            </CardForm>
        </div>
    );
}
