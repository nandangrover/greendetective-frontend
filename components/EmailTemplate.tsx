import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
} from '@react-email/components'

interface EmailTemplateProps {
  firstName: string
  lastName: string
  email: string
  message: string
}

export function EmailTemplate({
  firstName,
  lastName,
  email,
  message
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Heading style={heading}>
              New Contact Form Submission
            </Heading>
            <Text style={paragraph}>
              <strong>Name:</strong> {firstName} {lastName}
            </Text>
            <Text style={paragraph}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={paragraph}>
              <strong>Message:</strong>
            </Text>
            <Text style={messageText}>
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Add your email styling here... 