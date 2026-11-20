import { createFileRoute } from "@tanstack/react-router";
import { WhopClient } from "@whop/sdk";

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { planId, savePaymentMethod, customerEmail, customerName, metadata } =
            await request.json();

          const client = new WhopClient({
            token: process.env.WHOP_API_KEY!,
          });

          const config = await client.checkoutConfigurations.create({
            account_id: process.env.WHOP_COMPANY_ID!,
            variant_id: planId,
            mode: savePaymentMethod ? "setup" : "payment",
            metadata: {
              ...metadata,
              customer_email: customerEmail || "",
              customer_name: customerName || "",
              flow_type: savePaymentMethod
                ? "deposit_with_card_on_file"
                : "one_time_service",
            },
          } as any);

          return Response.json({
            checkoutConfigurationId: config.id,
            planId,
          });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Checkout configuration failed" },
            { status: 500 }
          );
        }
      },
    },
  },
});
