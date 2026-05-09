import { component$, Slot } from "@qwik.dev/core";
import { Header } from "../components/header/header";

export default component$(() => {
  return (
    <>
      <main>
        <Header title="title!!" />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
