import { logger } from "./app/logging.js";
import { web } from "./app/web.js";


web.listen("3000", () => {
  logger.info("Server started on port 3000")
});