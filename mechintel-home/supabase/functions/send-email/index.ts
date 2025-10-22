import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  brandName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, brandName }: EmailRequest = await req.json();

    console.log("Sending demo request email for:", email, brandName);

    const emailResponse = await resend.emails.send({
      from: "InteliMerch <onboarding@resend.dev>",
      to: [email],
      subject: "Your InteliMerch Demo Request",
      html: `
        <h1>Thank you for your interest in InteliMerch!</h1>
        <p>We've received your demo request for <strong>${brandName}</strong>.</p>
        <p>Our team will reach out to you within 24 hours to schedule your personalized demo.</p>
        <p>In the meantime, feel free to explore our website to learn more about how InteliMerch can transform your branded merchandise into measurable marketing channels.</p>
        <br>
        <p>Best regards,<br>The InteliMerch Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
