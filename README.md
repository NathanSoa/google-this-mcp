# Google This MCP

This is an experimental project for personal study purposes and obviously should **NOT** be considered for production use.
For this reason, I've only included execution details for Windows.

## 🧪 About

- **Learn how to create MCPs (Model Context Protocol)** - Understand in practice how to implement a custom MCP server and define tools;
- **Integrate MCPs with an AI agent** - Understand how to connect MCPs to AI systems like Claude, allowing the model to access external tools;
- **Make the agent effectively use the created service** - Validate that the agent can correctly invoke the tool, process the returned results, and incorporate them naturally into responses to the user.

## 🚀 Features

- Performs Google searches and returns up to 5 results
- Returns title and link for each result
- Integration with Google Custom Search API

## 📦 Installation

- Node.js (I used version 22)
- Google Custom Search API Key (Google Cloud)
- Google Custom Search Engine ID (Google Cloud)

## Configuration

1. Clone the repository:

```bash
git clone <repository-url>
cd google-search-mcp
```

2. Install dependencies:

```bash
yarn
```

3. Configure environment variables:

```bash
cp .env.example .env
```

4. Edit the .env file with your credentials:

```bash
GOOGLE_API_KEY=your_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
```

5. Build the project:

```bash
yarn build
```

## 🔧 Usage

For local testing, I recommend using the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)

For integration with AI agents, use the following configuration in MCP options:

```json
{
  "mcpServers": {
    "google-researcher": {
    "command": "node",
    "args": [
      "C:\\Users\\<YOUR-USER>\\<PATH>\\<TO>\\<BUILD>"
    ]
    }
  }
}
```