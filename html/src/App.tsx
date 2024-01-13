import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import mantineTheme from "./_components/mantineTheme";

const App = () => {
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={mantineTheme}
    ></MantineProvider>
  );
};

export default App;
