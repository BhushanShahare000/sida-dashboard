"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UserTable from "@/components/UserTable";
import UserForm from "@/components/UserForm";
import { User } from "@/types"; // import shared type

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  // Load users from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("users");
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Add new user
  const addUser = (user: Omit<User, "id">) => {
    setUsers([...users, { id: Date.now(), ...user }]);
    setOpen(false);
  };

  // Update existing user
  const updateUser = (user: User) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setEditingUser(null);
  };

  // Delete user
  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold mb-6">User Dashboard</h1>

      <Button onClick={() => setOpen(true)}>Add User</Button>

      <UserTable users={users} onEdit={setEditingUser} onDelete={deleteUser} />

      <UserForm
        open={open}
        setOpen={setOpen}
        onSubmit={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />
    </div>
  );
}
