import Server from "./server";

function main(): void {
  const server = new Server("v1.0.0 - test final");
  server.start();
}

main();
