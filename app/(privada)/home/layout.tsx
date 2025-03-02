import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sinergia",
    description: "App",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
