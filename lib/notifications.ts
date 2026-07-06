type JourneyEmailInput = {
  to: string;
  studentName: string;
  trackingUrl: string;
};

export async function sendJourneyStartedEmail({ to, studentName, trackingUrl }: JourneyEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "ExamSafexa <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[journey-email:skipped]", { to, studentName, trackingUrl });
    return { sent: false, reason: "RESEND_API_KEY is not configured." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `${studentName} started journey mode on ExamSafexa`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f2a5e;">
          <h1 style="font-size: 22px;">Journey mode is active</h1>
          <p>${studentName} has started sharing their exam journey location.</p>
          <p><a href="${trackingUrl}" style="color: #0c8686; font-weight: 700;">Open the read-only tracking link</a></p>
          <p style="color: #64748b;">This link only shows updates while journey mode is active.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "Unknown Resend error");
    throw new Error(message);
  }

  return { sent: true };
}
