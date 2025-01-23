import User from "../models/userModel.js";

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (!existingAdmin) {
      const admin = new User({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        isAdmin: true,
      });
      await admin.save();
      console.log("Admin user seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

export default seedAdmin;
