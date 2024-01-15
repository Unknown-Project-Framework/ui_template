import { useEffect } from "react";
import { nuiState, useNuiEvent } from "./utils";
import { Group, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CharacterCard from "./_components/CharacterCard";
import { useNavigate } from "@tanstack/react-router";

const Characters = () => {
  const navigate = useNavigate();

  const { setCharacters, characters } = nuiState();
  const [opened, handlers] = useDisclosure(false);
  useNuiEvent("loadCharacters", (_payload) => {
    setCharacters(_payload);
  });

  useEffect(() => {
    handlers.open();
  }, []);

  return (
    <Transition
      mounted={opened}
      transition="fade"
      duration={800}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Group
            style={{ position: "absolute", bottom: "1%", left: "0" }}
            justify="center"
            align="flex-end"
            w="100vw"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <CharacterCard
                key={i}
                slot_id={i}
                {...characters.find((char) => char.slot_id === i)}
                onChangePage={(to) => {
                  handlers.close();
                  setTimeout(() => {
                    navigate({
                      to,
                    });
                  }, 800);
                }}
              />
            ))}
          </Group>
        </div>
      )}
    </Transition>
  );
};

export default Characters;
