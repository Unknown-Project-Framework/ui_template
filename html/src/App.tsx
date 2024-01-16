import { BackgroundImage, Loader, Transition } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNuiEvent } from "./utils";
import { useDisclosure } from "@mantine/hooks";

const App = () => {
  const navigate = useNavigate();
  const [opened, handlers] = useDisclosure(true);

  useEffect(() => {
    if (document.readyState !== "complete") {
      return;
    }

    handlers.close();
  }, [document.readyState]);

  return (
    <Transition
      mounted={opened}
      transition="fade"
      duration={800}
      timingFunction="ease"
      onExited={() =>
        navigate({
          to: "/",
        })
      }
    >
      {(styles) => (
        <div style={styles}>
          <BackgroundImage src="loadscreen.png" w="100vw" h="100vh" />
          <Loader
            style={{
              position: "absolute",
              top: "2%",
              right: "2%",
            }}
            size={64}
          />
        </div>
      )}
    </Transition>
  );
};

export default App;
