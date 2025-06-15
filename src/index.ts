import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const server = new McpServer(
  {
    name: "Research Assistant",
    description: "A research assistant that helps with googling stuff.",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize Google Custom Search API
const customsearch = google.customsearch("v1");

server.tool(
  "google-this",
  "The search query to use for Google.",
  {
    query: z.string().describe("The search query to use for Google.").nonempty(),
  },
  async (args) => {
    const { query } = args;

    console.warn("Using Google Custom Search API. Ensure you have set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID environment variables.");
    console.warn("API_KEY", process.env.GOOGLE_API_KEY);
    console.warn("SEARCH_ENGINE_ID", process.env.GOOGLE_SEARCH_ENGINE_ID);

    if (!query) {
      throw new Error("Missing required argument: query");
    }

    try {
      const searchResults = await customsearch.cse.list({
        auth: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
        q: query,
        num: 5,
      });

      const results = searchResults.data.items?.map((item) => ({
        type: "resource" as const,
        resource: {
          text: item.title || "",
          uri: item.link || "",
          mimeType: "text/html"
        }
      })) || [];

      return {
        content: results
      };
    } catch (error) {
      console.error("Google search error:", error);
      throw new Error("Failed to perform Google search");
    }
  }
);

async function runServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server running on stdio");
  } catch (error) {
    console.error("Fatal error running server:", error);
    process.exit(1);
  }
}

// Start the server
runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
