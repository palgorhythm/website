import { google } from "googleapis";
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Get Google service account credentials from environment
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientEmail || !privateKey || !calendarId) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([]),
      };
    }

    // Initialize Google Calendar API
    const credentials = {
      type: "service_account",
      client_email: clientEmail,
      private_key: privateKey,
      private_key_id: "dummy-key-id",
      project_id: "dummy-project-id",
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Calculate date range (6 months back to 6 months forward)
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
    const sixMonthsFromNow = new Date(
      now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000,
    );

    // Fetch calendar events
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: sixMonthsAgo.toISOString(),
      timeMax: sixMonthsFromNow.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      q: "GIG:", // Search for events containing "GIG:"
    });

    const events = response.data.items || [];

    // Transform calendar events to gig format
    const gigs = events.map((event) => {
      const originalTitle = event.summary || "GIG: Untitled";

      // Parse title and location from "GIG: BAND @ LOCATION" format
      let displayTitle = originalTitle;
      let parsedLocation = "";

      if (originalTitle.includes("@")) {
        const parts = originalTitle.split("@");
        displayTitle = parts[0].trim(); // Everything before @ (including "GIG: BAND")
        if (parts.length > 1) {
          parsedLocation = parts[1].trim(); // Everything after @
        }
      }

      // Use parsed location from title, fallback to Google Calendar location field, or empty
      const finalLocation = parsedLocation || event.location || "";

      return {
        id: event.id,
        title: displayTitle, // Will be "GIG: BAND" (no @)
        startDate: event.start?.dateTime || event.start?.date,
        endDate: event.end?.dateTime || event.end?.date,
        date: event.start?.dateTime || event.start?.date, // Keep for compatibility
        location: finalLocation,
        description: event.description || "",
        status: "confirmed",
      };
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(gigs),
    };
  } catch (error) {
    console.error("Error fetching calendar events:", error);

    // Return empty array on error to prevent site breaking
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify([]),
    };
  }
};
