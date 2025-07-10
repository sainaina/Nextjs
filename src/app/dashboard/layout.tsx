import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";
import Error from "./error";

export default function DashboardLayout({
  children,
  login,
  team,
  user,
  create,
  delete_car,
  update,
  table,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  team: React.ReactNode;
  user: React.ReactNode;
  create: React.ReactNode;
  delete_car: React.ReactNode;
  update: React.ReactNode;
  table: React.ReactNode;
}) {
  return (
    <div>
      <ErrorBoundary errorComponent={Error}>
        {login}
        {team}
        {user}
        {create}
        {update}
        {delete_car}
        {table}
        {children}
      </ErrorBoundary>
    </div>
  );
}
