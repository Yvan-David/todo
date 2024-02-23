import express, { Request, Response } from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

app.use(express.json());

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'yvan',
  password: '',
  database: 'todo', // Use the name of the database you created
};

// Create a connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Sample data structure to store todos
let todos: { id: number; task: string; completed: boolean }[] = [
  { id: 1, task: 'Learn TypeScript', completed: false },
  { id: 2, task: 'Build Express App', completed: true },
  // ... other todos
];

// Routes
app.get('/todos', (req: Request, res: Response) => {
  // Retrieve all todos from the database
  connection.query('SELECT * FROM todos', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.post('/todos', (req: Request, res: Response) => {
    const newTodo = req.body;
  
    // Insert a new todo into the database
    connection.query('INSERT INTO todos SET ?', newTodo, (error) => {
      if (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(newTodo);
    });
  });
  
  app.put('/todos/:id', (req: Request, res: Response) => {
    const todoId = parseInt(req.params.id);
    const updatedTask = req.body.task;
    
    // Update the task in the database
    connection.query('UPDATE todos SET task = ? WHERE id = ?', [updatedTask, todoId], (error) => {
      if (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ id: todoId, task: updatedTask, completed: false });
    });
  });
  
  app.delete('/todos/:id', (req: Request, res: Response) => {
    const todoId = parseInt(req.params.id);
  
    // Delete the todo from the database
    connection.query('DELETE FROM todos WHERE id = ?', todoId, (error) => {
      if (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Todo deleted successfully' });
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
