import { createFileRoute } from "@tanstack/react-router";
import { WhopClient } from "@whop/sdk";

export const Route = createFileRoute("/api/invoices")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const {
            memberId,
            paymentMethodId,
            customerEmail,
            amountCents,
            description,
            collectionMethod,
          } = await request.json();

          const client = new WhopClient({
            token: process.env.WHOP_API_KEY!,
          });

          const invoice = await client.invoices.create({
            account_id: process.env.WHOP_COMPANY_ID!,
            member_id: memberId || undefined,
            payment_method_id:
              collectionMethod === "charge_automatically" && paymentMethodId
                ? paymentMethodId
                : undefined,
            recipient_emails: customerEmail ? [customerEmail] : undefined,
            memo:
              description ||
              "Architectural Shingle Roof Replacement — Final Balance (Less $500 Deposit)",
            items: [
              {
                title:
                  description ||
                  "Roof Replacement Final Completion Balance (Less $500 Deposit)",
                amount: amountCents,
                quantity: 1,
              },
            ],
          } as any);

          if (collectionMethod === "charge_automatically" && paymentMethodId) {
            await client.invoices.charge({ id: invoice.id });
          } else {
            await client.invoices.send({ id: invoice.id });
          }

          return Response.json({
            success: true,
            invoiceId: invoice.id,
            status: (invoice as any).status || "issued",
          });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Failed to create Whop invoice" },
            { status: 500 }
          );
        }
      },
    },
  },
});
