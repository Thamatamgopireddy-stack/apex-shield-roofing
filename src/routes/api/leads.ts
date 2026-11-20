import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const {
            fullName,
            email,
            phone,
            address,
            zipCode,
            serviceType,
            roofAge,
            insuranceClaim,
            notes,
          } = body;

          const res = await fetch("https://api.whop.com/api/v1/leads", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              company_id: process.env.WHOP_COMPANY_ID,
              name: fullName,
              email,
              phone,
              metadata: {
                property_address: address,
                zip_code: zipCode,
                service_requested: serviceType,
                estimated_roof_age: roofAge,
                is_insurance_claim: insuranceClaim ? "Yes" : "No",
                project_notes: notes || "None",
              },
            }),
          });

          const data = await res.json();
          if (!res.ok) {
            return Response.json(
              { error: data?.error?.message || JSON.stringify(data) },
              { status: res.status }
            );
          }

          return Response.json({
            success: true,
            leadId: data.id,
            lead: data,
          });
        } catch (err: any) {
          return Response.json(
            { error: err.message || "Failed to create lead" },
            { status: 500 }
          );
        }
      },
    },
  },
});
