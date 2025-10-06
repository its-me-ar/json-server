import fs from "fs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "ASDTSG2767UYQWVE12E682987*(&&%64712UIYGHWAS67SUY"; 
const dbPath = "./src/db.json";

const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

// Generate JWT for each user
db.users = db.users.map((user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: "7d" }
  );
  return { ...user, token };
});

// Save the updated file
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("✅ JWT tokens generated and saved to db.json");
