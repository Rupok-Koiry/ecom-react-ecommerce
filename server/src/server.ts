import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

/**
 * Main function to establish database connection and start the server.
 */
async function main() {
  try {
    // Connect to the MongoDB database using the provided URL from the configuration.
    await mongoose.connect(config.DATABASE_URL as string);

    // Start the server and listen on the specified port from the configuration.
    server = app.listen(config.PORT, () => {
      console.log(`App is listening on port ${config.PORT}`);
    });
  } catch (err) {
    // Log any errors that occur during database connection or server startup.
    console.log(err);
  }
}

// Execute the main function to initiate the application.
main();

/**
 * Handle unhandled promise rejections.
 * Gracefully shut down the server if an unhandled rejection occurs.
 */
process.on('unhandledRejection', () => {
  console.log(`😈 Unhandled rejection is detected, shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

/**
 * Handle uncaught exceptions.
 * Immediately shut down the application if an uncaught exception occurs.
 */
process.on('uncaughtException', () => {
  console.log(`😈 Uncaught Exception is detected, shutting down ...`);
  process.exit(1);
});
