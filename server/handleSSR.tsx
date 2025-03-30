import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Request, Response } from "express";
import { StaticRouter } from "react-router-dom";
import App from "../src/App";

interface SSRContext {
  url?: string;
  dataFromServer?: any;
}

// Assume this function fetches your data (replace with your actual logic)
async function getDataFromServer(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Data fetched on the server!" });
    }, 500);
  });
}

export default async function handleSSR(req: Request, res: Response) {
  const context: SSRContext = {};
  let serverData: any = null;

  try {
    serverData = await getDataFromServer();
    context.dataFromServer = serverData;
  } catch (error) {
    console.error("Error fetching data on server:", error);
  }

  res.setHeader("content-type", "text/html");

  const stream = renderToPipeableStream(
    <StaticRouter location={req.url} basename="/">
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: ["/bundle.js"],

      onShellReady() {
        res.write(`<!DOCTYPE html><html lang="en"><head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
            <title>SSR React App</title>
          </head><body><div id="root">`);

        stream.pipe(res);
      },

      onAllReady() {
        res.write(`
            </div>
          </body>
        </html>
        `);
        res.end();
      },

      onError(error) {
        console.error("SSR Error:", error);
        res
          .status(500)
          .send("<!DOCTYPE html><html><body><h1>Error 500</h1></body></html>");
      },
    }
  );
}
