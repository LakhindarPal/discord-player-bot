import { sync } from "glob";

export async function loadComponents(client) {
  const componentFiles = sync("./src/components/**/*.js");

  for (const file of componentFiles) {
    const component = await import(`../../${file}`);

    if (!component.data?.id) {
      throw new TypeError(
        `The component at ${file} is missing a required "data.id" property.`
      );
    }

    if (typeof component.execute !== "function") {
      throw new TypeError(
        `The component at ${file} is missing a required "execute" function.`
      );
    }

    const id = component.data.id;
    client.components.set(id, component);

    if (process.env.NODE_ENV === "development") {
      console.log(`Loaded Component: ${id}`);
    }
  }
}
