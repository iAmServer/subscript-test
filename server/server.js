const app = require("./server-config.js");
const taskRoutes = require("./routes/task-routes.js");
const orgRoutes = require("./routes/org-routes.js");
const userRoutes = require("./routes/user-routes.js");

const port = process.env.PORT || 5000;

// Organizational routes
app.get("/organizations", orgRoutes.getAllOrganizations);
app.get("/organizations/:id", orgRoutes.getOrganization);
app.post("/organizations", orgRoutes.createOrganization);
app.put("/organizations/:id", orgRoutes.updateOrganization);
app.delete("/organizations/:id", orgRoutes.deleteOrganization);

//User routes
app.get("/organizations/users/:id", userRoutes.getAllUsers);
app.get("/organizations/users/:organization_id/:id", userRoutes.getUser);
app.post("/organizations/users/:id", userRoutes.newUser);
app.put("/organizations/users/:organization_id/:id", userRoutes.updateUser);
app.delete("/organizations/users/:organization_id/:id", userRoutes.deleteUser);

app.get("/", taskRoutes.getAllTodos);
app.get("/:id", taskRoutes.getTodo);

app.post("/", taskRoutes.postTodo);
app.patch("/:id", taskRoutes.patchTodo);

app.delete("/", taskRoutes.deleteAllTodos);
app.delete("/:id", taskRoutes.deleteTodo);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
