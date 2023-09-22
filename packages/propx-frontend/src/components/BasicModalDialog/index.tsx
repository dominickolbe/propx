import QueueIcon from "@mui/icons-material/Queue";
import Button from "@mui/joy/Button";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { PropertyCreate } from "propx-models/types";
import { useState } from "react";
import DropZone from "../DropZone";

export const BasicModalDialog = (props: {
  onAddNewProperty: (property: PropertyCreate) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [address, setAddress] = useState("");
  const [price, setPrice] = useState<number>(1000);

  return (
    <>
      <Button
        color="primary"
        startDecorator={<QueueIcon />}
        size="sm"
        onClick={() => setOpen(true)}
      >
        Add New
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size="lg">
          <DialogTitle>Create new listing</DialogTitle>
          <DialogContent>
            Fill in the information of the property.
          </DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              props.onAddNewProperty({
                address,
                price,
                image: "https://picsum.photos/1920/1080",
              });
              setAddress("");
              setPrice(1000);
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  required
                  type="text"
                  autoComplete="off"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  slotProps={{
                    input: {
                      minLength: 5,
                      maxLength: 255,
                    },
                  }}
                  autoFocus
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  required
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  slotProps={{
                    input: {
                      min: 1,
                      max: 1000000,
                    },
                  }}
                  startDecorator={"£"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Photo</FormLabel>
                <DropZone />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};
