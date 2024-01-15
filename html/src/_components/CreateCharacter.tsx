import classes from "./ContainedInput.module.css";

import {
  Button,
  Divider,
  Flex,
  Group,
  SegmentedControl,
  Text,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

import { fetchNui, nuiState } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const CreateCharacter = () => {
  const [preventOverloading, setPreventOverloading] = useState(false);
  const navigate = useNavigate();
  const { slot_id } = nuiState();
  const [opened, handlers] = useDisclosure(false);

  useEffect(() => {
    handlers.open();
  }, [slot_id]);

  const maxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  };

  const calculateAge = (birthday: Date) => {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: maxDate(),
      gen: "m",
    },

    validate: {
      firstName: isNotEmpty("First Name is required"),
      lastName: isNotEmpty("Last Name is required"),
    },
  });

  return (
    <Transition
      mounted={opened}
      transition="fade"
      duration={800}
      timingFunction="ease"
    >
      {(styles) => (
        <form
          style={styles}
          onSubmit={form.onSubmit((values) => {
            setPreventOverloading(true);
            fetchNui("createCharacter", {
              ...values,
              slot_id,
              dob: new Date(values.dob).toISOString().split("T")[0],
            }).then(() => {
              handlers.close();

              setTimeout(() => {
                navigate({
                  to: "/",
                });
              }, 800);
            });
          })}
        >
          <Flex
            ml="5%"
            h="100vh"
            gap="md"
            justify="center"
            align="flex-start"
            direction="column"
            wrap="wrap"
            w="16vw"
          >
            <Group>
              <IconUsersGroup color="#22ffc4" size={54} />

              <div>
                <Title order={3} c="myColor">
                  Identity Creation
                </Title>
                <Text size="sm">Enter your character details.</Text>
                <Divider color="myColor.2" />
              </div>
            </Group>

            <SegmentedControl
              w="100%"
              fullWidth
              color="myColor"
              data={[
                { value: "m", label: "Male" },
                { value: "f", label: "Female" },
                { value: "n", label: "Non-binary" },
              ]}
              {...form.getInputProps("gen")}
            />

            <TextInput
              label="First Name"
              placeholder="John"
              {...form.getInputProps("firstName")}
              classNames={classes}
            />

            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...form.getInputProps("lastName")}
              classNames={classes}
            />

            <DatePickerInput
              label="Date of Birth"
              placeholder="Pick date"
              {...form.getInputProps("dob")}
              valueFormat="MM/DD/YYYY"
              classNames={classes}
              minDate={new Date(1945, 0, 1)}
              maxDate={maxDate()}
              rightSection={
                <Text size="sm" c="dimmed" fw={600}>
                  Age: {calculateAge(form.values.dob)}
                </Text>
              }
            />

            <Button.Group w="100%">
              <Button fullWidth variant="light" type="submit" disabled={preventOverloading}>
                Create
              </Button>

              <Button
                fullWidth
                variant="light"
                color="red"
                onClick={() => {
                  handlers.close();

                  setTimeout(() => {
                    navigate({
                      to: "/",
                    });
                  }, 800);
                }}
              >
                Cancel
              </Button>
            </Button.Group>
          </Flex>
        </form>
      )}
    </Transition>
  );
};

export default CreateCharacter;
