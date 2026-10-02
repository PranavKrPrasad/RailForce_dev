import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.seed" });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.seed");
  process.exit(1);
}

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const ranks = {
  personnel: ["Constable", "Head Constable"],
  supervisor: ["Sub-Inspector"],
  inspector: ["Inspector"],
  command: ["Deputy Commandant"],
  higher_authority: ["Commandant"],
  admin: ["System Administrator"],
};

const units = [
  "Unit Alpha",
  "Unit Beta",
  "Unit Gamma",
  "Unit Delta",
  "Unit Echo",
  "Unit Foxtrot",
  "Unit Golf",
  "Unit Hotel",
  "Unit India",
  "Unit Juliet",
];

const firstNames = [
  "Aarav", "Rahul", "Vikram", "Manoj", "Sanjay",
  "Meena", "Arun", "Deepa", "Rohan", "Kavya",
  "Aditya", "Priya", "Ravi", "Neha", "Amit",
  "Anjali", "Karan", "Pooja", "Nitin", "Sneha"
];

const lastNames = [
  "Sharma", "Kumar", "Singh", "Das", "Rao",
  "Pillai", "Joshi", "Thomas", "Patil", "Menon",
  "Verma", "Yadav", "Mehta", "Nair", "Mishra"
];

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function name() {
  return `${pick(firstNames)} ${pick(lastNames)}`;
}

function roleFor(i) {
  if (i <= 800) return "personnel";
  if (i <= 900) return "supervisor";
  if (i <= 960) return "inspector";
  if (i <= 985) return "command";
  if (i <= 999) return "higher_authority";
  return "admin";
}

console.log("Loading existing Supabase users...");

const { data: existingUsers, error: listError } =
  await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

if (listError) {
  console.error("Failed to list users:", listError.message);
  process.exit(1);
}

console.log(`Found ${existingUsers.users.length} existing Auth users.`);
console.log("Starting RailForce 1,000-user update...\n");

let updated = 0;
let created = 0;
let failed = 0;

for (let i = 1; i <= 1000; i++) {
  const employeeId = `RF-${String(i).padStart(6, "0")}`;
  const role = roleFor(i);
  const fullName = name();

  const email =
    `pranavkprasad2005+rf${String(i).padStart(6, "0")}@gmail.com`;

  const password =
    `RF@2026${String(i).padStart(4, "0")}!`;

  let user;

  const existing = existingUsers.users.find(
    (u) => u.user_metadata?.employee_id === employeeId
  );

  if (existing) {
    const { data: updatedUser, error: updateError } =
      await supabase.auth.admin.updateUserById(existing.id, {
        email,
        email_confirm: true,
      });

    if (updateError) {
      console.error(
        `Email update failed ${employeeId}: ${updateError.message}`
      );
      failed++;
      continue;
    }

    user = updatedUser.user;
    updated++;
  } else {
    const { data, error } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          employee_id: employeeId,
          full_name: fullName,
        },
      });

    if (error) {
      console.error(`Failed ${employeeId}: ${error.message}`);
      failed++;
      continue;
    }

    user = data.user;
    created++;
  }

  const { error: profileError } =
    await supabase
      .from("profiles")
      .update({
        employee_id: employeeId,
        full_name: fullName,
        role,
        rank: pick(ranks[role]),
        unit: pick(units),
        active: true,
      })
      .eq("id", user.id);

  if (profileError) {
    console.error(
      `Profile failed ${employeeId}: ${profileError.message}`
    );
    failed++;
    continue;
  }

  console.log(
    `${i}/1000 | ${employeeId} | ${email} | ${role}`
  );
}

console.log("\n=================================");
console.log("RailForce user update completed");
console.log("=================================");
console.log(`Updated existing users: ${updated}`);
console.log(`Created new users:      ${created}`);
console.log(`Failed:                 ${failed}`);
console.log("=================================");