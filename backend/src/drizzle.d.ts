declare module "drizzle-orm/node-postgres" {
  export const drizzle: any;
}
declare module "drizzle-orm/neon-http" {
  export const drizzle: any;
}
declare module "drizzle-orm" {
  export const asc: any;
  export const desc: any;
  export const eq: any;
}
declare module "drizzle-orm/pg-core" {
  export const boolean: any;
  export const index: any;
  export const integer: any;
  export const pgTable: any;
  export const text: any;
  export const timestamp: any;
}
declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
  serve(options: { port: number }, handler: (request: Request) => Response | Promise<Response>): void;
};
