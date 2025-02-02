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

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  width: '400px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#f5f5f5',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '10px',
};


const messageText = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '10px',
};

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