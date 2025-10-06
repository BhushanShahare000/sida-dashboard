"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UserTable from "@/components/UserTable";
import UserForm from "@/components/UserForm";

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("users");
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: any) => {
    setUsers([...users, { id: Date.now(), ...user }]);
    setOpen(false);
  };

  const updateUser = (user: any) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setEditingUser(null);
  };

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
