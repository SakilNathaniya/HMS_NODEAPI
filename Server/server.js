import express, { json, response } from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hospital",
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});

app.get("/getDoctor", (req, res) => {
  const sql = "Select * FROM Doctor";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get doctor error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getPatient", (req, res) => {
  const sql = "Select * FROM Patient";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get patient error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getAppointment", (req, res) => {
  const sql = "Select * FROM Appointment";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get appointment error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Select * FROM Doctor where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get doctor error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getPatient/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Select * FROM Patient where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get patient error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getAppointment/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Select * FROM Appointment where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get appointment error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, contact, special } = req.body;
  const sql =
    "UPDATE doctor SET name = ?, contact = ?, special = ? WHERE id = ?";
  const params = [name, contact, special, id];
  con.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Update doctor error in SQL" });
    }
    return res.json({ Status: "Success" });
  });
});

app.put("/updatePatient/:id", (req, res) => {
  const id = req.params.id;
  const { name, contact, address, gender } = req.body;
  const sql =
    "UPDATE patient SET name = ?, contact = ?, address = ?, gender = ? WHERE id = ?";
  const params = [name, contact, address, gender, id];
  con.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Update patient error in SQL" });
    }
    return res.json({ Status: "Success" });
  });
});

app.put("/updateAppointment/:id", (req, res) => {
  const id = req.params.id;
  const { doctorId, patientId, date, time } = req.body;
  const sql =
    "UPDATE appointment SET doctorId = ?, patientId = ?, date = ?, time = ? WHERE id = ?";
  const params = [doctorId, patientId, date, time, id];
  con.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Update appointment error in SQL" });
    }
    return res.json({ Status: "Success" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM doctor WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Update doctor error in sql" });
    return res.json({ Status: "Success" });
  });
});

app.delete("/deletePatient/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM patient WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Update patient error in sql" });
    return res.json({ Status: "Success" });
  });
});
app.delete("/deleteAppointment/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM appointment WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Update appointment error in sql" });
    return res.json({ Status: "Success" });
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticate" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  const sql = "SELECT * FROM Users";
  con.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: "Error retrieving users from the database" });
    }
    const { role, id } = req;
    return res.json({ Status: "Success", Result: result, role, id });
  });
});

app.get("/patientCount", (req, res) => {
  const sql = "Select count(id) as patient from patient";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

app.get("/doctorCount", (req, res) => {
  const sql = "Select count(id) as doctor from doctor";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

app.get("/appointmentCount", (req, res) => {
  const sql = "Select count(id) as appointment from appointment";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json(result);
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  con.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ Status: "Error", Error: "Error in running query" });
      } else if (result.length === 0) {
        res.send({ Status: "Error", Error: "Invalid email or password" });
      } else {
        const id = result[0].id;
        const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        res.send({ Status: "Success", Data: result });
      }
    }
  );
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

// ...
app.post("/create", (req, res) => {
  const { name, contact, special } = req.body;

  const sql = "INSERT INTO doctor (name, contact, special) VALUES (?, ?, ?)";
  const values = [name, contact, special];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the doctor." });
    }

    return res.status(200).json({ message: "Doctor added successfully." });
  });
});
// ...

// ...
app.post("/createPatient", (req, res) => {
  const { name, gender, contact, address } = req.body;

  const sql =
    "INSERT INTO patient (name, gender, contact, address) VALUES (?, ?, ?, ?)";
  const values = [name, gender, contact, address];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the patient." });
    }

    return res.status(200).json({ message: "Patient added successfully." });
  });
});

// ...

app.get("/getDoctors", (req, res) => {
  const sql = "SELECT * FROM Doctor";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Get doctor error in SQL:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching doctors." });
    }
    return res.status(200).json(result);
  });
});

app.get("/getPatients", (req, res) => {
  const sql = "SELECT * FROM Patient";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Get patient error in SQL:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching patients." });
    }
    return res.status(200).json(result);
  });
});

app.post("/createAppointment", (req, res) => {
  const { date, time, doctorId, patientId } = req.body;

  if (!date || !time || !doctorId || !patientId) {
    return res
      .status(400)
      .json({ error: "Date, time, doctorId, and patientId are required." });
  }

  const sql =
    "INSERT INTO appointment (date, time, doctorId, patientId) VALUES (?, ?, ?, ?)";
  const values = [date, time, doctorId, patientId];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Create appointment error in SQL:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the appointment." });
    }

    return res.status(200).json({ message: "Appointment added successfully." });
  });
});

// ...

app.listen(8081, () => {
  console.log("Running");
});
