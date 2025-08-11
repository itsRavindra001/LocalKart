// backend/src/config/createDefaultAdmin.ts
import bcrypt from "bcrypt";
import User from "../../models/User";

export const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10); // Default pass
    await User.create({
      name: "Super Admin",
      username: "admin",
      email: "admin@localkart.com",
      dob: "1990-01-01",
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Default admin account created: admin / admin123");
  }
};
