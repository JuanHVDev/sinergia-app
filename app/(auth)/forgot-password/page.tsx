import CardForm from "@/components/CardForm";
import FormForgotPassword from "@/components/formForgotPassword";

export default function ForgetPasswordPage() {
    return (
        <div className="min-h-screen w-[350px] mx-auto flex items-center justify-center">
            <CardForm
                title="Reset Password"
                description="Reset your password"
                children={<FormForgotPassword />}
            />
        </div>
    );
}
