export function isAdminEmail(email?: string | null) {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return Boolean(email && admins.includes(email.toLowerCase()));
}
