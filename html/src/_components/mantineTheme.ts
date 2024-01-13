import { createTheme, MantineColorsTuple } from "@mantine/core";
import RingLoader from "./RingLoader";

const myColor: MantineColorsTuple = [
  "#e0fffa",
  "#cbfff3",
  "#9affe6",
  "#64ffd8",
  "#3bffcc",
  "#22ffc4",
  "#09ffc1",
  "#00e3a9",
  "#00ca95",
  "#00af7f",
];

const mantineTheme = createTheme({
  fontFamily: "Figtree",
  primaryColor: "myColor",
  colors: {
    myColor,
  },
  components: {
    Loader: RingLoader.extend({
      defaultProps: {
        loaders: { ...RingLoader.defaultLoaders, ring: RingLoader },
        type: "ring",
      },
    }),
  },
});

export default mantineTheme;
