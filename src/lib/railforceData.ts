import { supabase } from "./supabase";

export async function getMyProfile() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No authenticated user");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function getUnitPersonnel(unit: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("unit", unit)
    .eq("active", true)
    .order("employee_id");

  if (error) throw error;

  return data ?? [];
}

export async function getIncidents() {
  const { data, error } = await supabase
    .from("incidents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getDuties() {
  const { data, error } = await supabase
    .from("duties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}