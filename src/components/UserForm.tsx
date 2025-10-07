"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface User {
  id?: string;
  name: string;
  email: string;
}

interface UserFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (user: Omit<User, "id">) => void; // add new user
  editingUser?: User | null; // null when adding
  updateUser?: (user: User) => void; // update existing user
}

export default function UserForm({
  open,
  setOpen,
  onSubmit,
  editingUser,
  updateUser,
}: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🧠 If editing, pre-fill form fields
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setOpen(true);
    }
  }, [editingUser, setOpen]);

  // 🧠 Submit handler
  const handleSubmit = () => {
    if (editingUser && updateUser) {
      updateUser({ ...editingUser, name, email });
    } else {
      onSubmit({ name, email });
    }
    setName("");
    setEmail("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Button onClick={handleSubmit}>
            {editingUser ? "Update" : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
