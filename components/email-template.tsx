import { Container, Heading, Link, Text } from "@react-email/components";

interface EmailTemplateProps {
    name: string;
    url: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    url,
}) => (
    <Container>
        <Heading as="h1">Bienvenido a Sinergia, {name}!</Heading>
        <Text>
            Gracias por registrarte en Sinergia. Para continuar, por favor haz
            click en el siguiente enlace:
        </Text>
        <Link href={url}>{url}</Link>
    </Container>
);
