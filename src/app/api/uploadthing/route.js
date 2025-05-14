import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Exporta los handlers GET y POST
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});