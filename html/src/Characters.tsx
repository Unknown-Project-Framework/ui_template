import { useState } from "react";
import { useNuiEvent } from "./utils";
import { Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Characters = () => {
  const [opened, handlers] = useDisclosure(false);
  const [loaderData, setLoaderData] = useState<any>([]);
  useNuiEvent("loadCharacters", (_payload) => {
    console.log("loadCharacters");
    setLoaderData(_payload);

    setTimeout(() => {
      handlers.open();
    }, 1000);
  });

  return (
    <Transition
      mounted={opened}
      transition="fade"
      duration={800}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <pre>
            <code>{JSON.stringify(loaderData, null, 2)}</code>
          </pre>
        </div>
      )}
    </Transition>
  );
};

export default Characters;
