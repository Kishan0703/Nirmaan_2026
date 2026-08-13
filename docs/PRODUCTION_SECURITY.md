# Secure Production Deployment & Infrastructure Hardening Guide

---

## 1. HTTPS & Transport Security (Enforced)
- **HSTS Headers**: Configured `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` in `next.config.mjs` to force HTTPS connections for 2 years.
- **TLS Protocol**: Reverse proxy / ingress load balancer (Vercel, AWS CloudFront, Cloudflare, NGINX) must reject TLS 1.0/1.1 and enforce **TLS 1.2+** with modern cipher suites.
- **Security Headers**:
  - `X-Frame-Options: DENY` (Mitigates Clickjacking)
  - `X-Content-Type-Options: nosniff` (Mitigates MIME-sniffing)
  - `Permissions-Policy`: Restricts camera, microphone, geolocation access.
  - `Content-Security-Policy`: Restricts frame-ancestors and script sources.

---

## 2. Database Network Isolation & SSL Configuration
- **Public Internet Restriction**:
  - Database (PostgreSQL / Neon) must **NEVER** expose open `0.0.0.0/0` ports to the public internet.
  - In production AWS/GCP VPCs, deploy the database inside a **Private Subnet** with no public IP assignment.
  - Limit database ingress security groups exclusively to the application server VPC subnet / IP range.
- **TLS Database Connection**:
  - `DATABASE_URL` must enforce SSL: `postgresql://user:password@ep-db.neon.tech/neondb?sslmode=require`.

---

## 3. Production Secret Management & Isolation
- **Environment Variable Segregation**:
  - All sensitive keys (`AUTH_SECRET`, `DATABASE_URL`, `WEBHOOK_SECRET`, `SMTP_PASS`) are strictly stored server-side.
  - No secret must carry the `NEXT_PUBLIC_` prefix.
- **Secret Storage & Vault**:
  - Production secrets should be managed via an environment secret manager (e.g. AWS Secrets Manager, HashiCorp Vault, Vercel Encrypted Environment Variables).
  - Rotate `AUTH_SECRET` periodically; active sessions will require re-authentication upon rotation.

---

## 4. Structured JSON Audit Logging (SIEM Integration)
- **Structured Log Output**:
  - Configured [`lib/auth/logger.ts`](file:///c:/Users/Shashi%20kiran/Grinding/Nirmaan_2026/lib/auth/logger.ts) to format audit events as JSON lines (`[AUDIT_LOG]`, `[SECURITY_ALERT]`, `[ERROR_LOG]`).
- **Monitored Audit Events**:
  - `AUTH_LOGIN_SUCCESS`, `AUTH_LOGIN_FAILED`, `AUTH_REGISTER`, `AUTH_PASSWORD_RESET`
  - `RATE_LIMIT_EXCEEDED`, `TOKEN_REUSE_DETECTED`, `UNAUTHORIZED_ADMIN_ATTEMPT`, `WEBHOOK_VERIFICATION_FAILED`
- **Log Collection**: Direct stdout/stderr streams to Datadog, AWS CloudWatch, or Grafana Loki for real-time alerting on unusual traffic spikes or security alerts.
