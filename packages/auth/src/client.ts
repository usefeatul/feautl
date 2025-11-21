import { createAuthClient } from "better-auth/react"
import {
  inferOrgAdditionalFields,
  organizationClient,
  lastLoginMethodClient,
} from "better-auth/client/plugins"
import { emailOTPClient } from "better-auth/client/plugins"
import type { AuthServer } from "./auth"

export const authClient = createAuthClient({
  plugins: [
    organizationClient({ schema: inferOrgAdditionalFields<AuthServer>() }),
    lastLoginMethodClient(),
    emailOTPClient(),
  ],
})

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  getSession,
  organization,
  useListOrganizations,
  useActiveOrganization,
} = authClient