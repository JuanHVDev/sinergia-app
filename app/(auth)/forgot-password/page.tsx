import CardForm from "@/components/CardForm";
import FormForgotPassword from "@/components/auth/formForgotPassword";

export default function ForgetPasswordPage() {
    return (
        <div className="min-h-screen w-[350px] mx-auto flex items-center justify-center">
            <CardForm
                title="Restablecer contraseña"
                description="Restablece tu contraseña"
                children={<FormForgotPassword />}
            />
        </div>
    );
}
