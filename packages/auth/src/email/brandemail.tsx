import { Html, Head, Preview, Body, Container, Section, Text, Heading, Button, Hr } from "@react-email/components"

export type Brand = {
  name?: string
  logoUrl?: string
  primaryColor?: string
  backgroundColor?: string
  textColor?: string
}

type Props = {
  eyebrow?: string
  title?: string
  intro?: string
  highlight?: string
  body?: string
  paragraphs?: string[]
  outro?: string
  ctaText?: string
  ctaUrl?: string
  psText?: string
  signatureName?: string
  brand?: Brand
  addressLines?: string[]
}

function resolveBrand(brand?: Brand): Required<Brand> {
  return {
    name: brand?.name || "Feedgot",
    logoUrl: brand?.logoUrl || "",
    primaryColor: brand?.primaryColor || "#111111",
    backgroundColor: brand?.backgroundColor || "#ffffff",
    textColor: brand?.textColor || "#0a0a0a",
  }
}

export function BrandedEmail(props: Props) {
  const b = resolveBrand(props.brand)
  return (
    <Html>
      <Head />
      <Preview>{props.title || b.name}</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: b.backgroundColor }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: 16 }}>
            <Section style={{ padding: "28px 28px 10px 28px" }}>
              {props.eyebrow && (
                <Text style={{ color: "#6b7280", fontSize: 12, letterSpacing: 6, textTransform: "uppercase", margin: 0 }}>{props.eyebrow}</Text>
              )}
              <Heading style={{ fontSize: 32, lineHeight: "40px", margin: "10px 0 0 0", color: b.textColor }}>{b.name}</Heading>
            </Section>
            <Section style={{ padding: "10px 28px 28px 28px" }}>
              {props.intro && <Text style={{ color: b.textColor, fontSize: 16, lineHeight: "28px" }}>{props.intro}</Text>}
              {props.title && <Heading as="h2" style={{ fontSize: 18, fontWeight: 600, margin: "16px 0", color: b.textColor }}>{props.title}</Heading>}
              {props.paragraphs?.map((p, i) => (
                <Text key={i} style={{ color: b.textColor, fontSize: 16, lineHeight: "28px" }}>{p}</Text>
              ))}
              {!props.paragraphs && props.body && <Text style={{ color: b.textColor, fontSize: 16, lineHeight: "28px" }}>{props.body}</Text>}
              {props.highlight && <Text style={{ fontSize: 20, fontWeight: 700, letterSpacing: 4, color: b.textColor }}>{props.highlight}</Text>}
              {props.outro && <Text style={{ color: b.textColor, fontSize: 16, lineHeight: "28px" }}>{props.outro}</Text>}
              {props.ctaText && props.ctaUrl && (
                <Button href={props.ctaUrl} style={{ display: "inline-block", backgroundColor: b.primaryColor, color: "#ffffff", textDecoration: "none", fontWeight: 600, padding: "14px 20px", borderRadius: 9999, marginTop: 20 }}>
                  {props.ctaText}
                </Button>
              )}
              {props.psText && <Text style={{ color: "#6b7280", fontSize: 14, lineHeight: "24px", marginTop: 20 }}>{props.psText}</Text>}
              {props.signatureName && (
                <>
                  <Text style={{ color: b.textColor, fontSize: 16, lineHeight: "28px", marginTop: 16 }}>Best regards,</Text>
                  <Text style={{ color: b.textColor, fontSize: 16, lineHeight: "28px" }}>{props.signatureName}</Text>
                </>
              )}
            </Section>
            <Hr style={{ borderColor: "#e5e7eb", margin: 0 }} />
            <Section style={{ padding: 16 }}>
              <table width="100%" role="presentation" style={{ width: "100%", borderSpacing: 0 }}>
                <tbody>
                  <tr>
                    <td style={{ width: "50%", verticalAlign: "top", textAlign: "left" }}>
                      {props.addressLines && props.addressLines.length > 0 ? (
                        <>
                          {props.addressLines.map((line, i) => (
                            <Text key={i} style={{ color: "#9ca3af", fontSize: 12, margin: 0 }}>{line}</Text>
                          ))}
                        </>
                      ) : (
                        <Text style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>© {new Date().getFullYear()} {b.name}</Text>
                      )}
                    </td>
                    <td style={{ width: "50%", verticalAlign: "top", textAlign: "right" }}>
                      <Text style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>{b.name}</Text>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
