import {
  Avatar,
  BackgroundImage,
  Button,
  Collapse,
  Flex,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { fetchNui, nuiState } from "../utils";

const CharacterCard = ({
  char_id,
  slot_id,
  pedheadshot,
  firstName,
  lastName,
  onChangePage,
}: {
  char_id: number;
  slot_id: number;
  pedheadshot: string;
  firstName: string;
  lastName: string;
  onChangePage: (to: string) => void;
}) => {
  const { setSlotId } = nuiState();
  const [opened, { toggle, close }] = useDisclosure(false, {
    onClose: () => {
      setSlotId(null);
      fetchNui("defaultCamera", slot_id);
    },
    onOpen: () => {
      setSlotId(slot_id);
      fetchNui("setCamera", slot_id);
    },
  });
  const ref = useClickOutside(() => close());

  return (
    <BackgroundImage
      ref={ref}
      onClick={toggle}
      radius="md"
      w="14vw"
      p="xs"
      src="unemployed.jpg"
    >
      <Flex gap={0} align="center" w="100%" direction="column">
        <Avatar
          radius="50%"
          size="xl"
          variant="transparent"
          src={pedheadshot || null}
        />

        <Stack gap={0} w="100%" align="center">
          <Title order={3}>
            {char_id ? firstName + " " + lastName : "Empty Slot"}
          </Title>
          <Text size="sm" mb="xs">
            {char_id ? "Character ID: " + char_id : "Slot " + (slot_id + 1)}
          </Text>

          <Collapse in={opened} transitionDuration={400} w="100%">
            {char_id ? (
              <Button.Group>
                <Button
                  fullWidth
                  variant="light"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Play");
                  }}
                >
                  Play
                </Button>
                <Button
                  fullWidth
                  variant="light"
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Delete");
                  }}
                >
                  Delete
                </Button>
              </Button.Group>
            ) : (
              <Button
                fullWidth
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  onChangePage("/create");
                }}
              >
                Create Character
              </Button>
            )}
          </Collapse>
        </Stack>
      </Flex>
    </BackgroundImage>
  );
};

export default CharacterCard;
