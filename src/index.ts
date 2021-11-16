import Server from "./server";

function main(): void {
  const server = new Server("v1.0.0 - test 2");
  server.start();
}

main();
