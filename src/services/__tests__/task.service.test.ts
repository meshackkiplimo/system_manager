import { createTaskService, getTaskByIdService, getAllTasksService } from '../task.service';
import db from '../../drizzle/db';

// Mock the database module
jest.mock('../../drizzle/db', () => ({
  insert: jest.fn(),
  query: {
    TasksTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  }
}));

describe('Task Service', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTaskService', () => {
    it('should create a new task', async () => {
      // Mock data
      const mockTask = {
        userId: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        completed: false,
        priority: 'low'
      };
      const mockReturn = { id: 1, ...mockTask };

      // Setup mock return value
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockReturn])
        })
      });

      // Execute the service
      const result = await createTaskService(mockTask);

      // Assertions
      expect(result).toEqual(mockReturn);
      expect(db.insert).toHaveBeenCalled();
    });
  });

  describe('getTaskByIdService', () => {
    it('should return a task by id', async () => {
      // Mock data
      const mockTask = {
        id: 1,
        userId: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        completed: false,
        priority: 'low'
      };

      // Setup mock return value
      (db.query.TasksTable.findFirst as jest.Mock).mockResolvedValue(mockTask);

      // Execute the service
      const result = await getTaskByIdService('1');

      // Assertions
      expect(result).toEqual(mockTask);
      expect(db.query.TasksTable.findFirst).toHaveBeenCalled();
    });

    it('should return null if task not found', async () => {
      // Setup mock return value
      (db.query.TasksTable.findFirst as jest.Mock).mockResolvedValue(null);

      // Execute the service
      const result = await getTaskByIdService('999');

      // Assertions
      expect(result).toBeNull();
      expect(db.query.TasksTable.findFirst).toHaveBeenCalled();
    });
  });

  describe('getAllTasksService', () => {
    it('should return all tasks', async () => {
      // Mock data
      const mockTasks = [
        {
          id: 1,
          userId: 1,
          title: 'Task 1',
          description: 'Description 1',
          dueDate: new Date(),
          completed: false,
          priority: 'low'
        },
        {
          id: 2,
          userId: 1,
          title: 'Task 2',
          description: 'Description 2',
          dueDate: new Date(),
          completed: true,
          priority: 'high'
        }
      ];

      // Setup mock return value
      (db.query.TasksTable.findMany as jest.Mock).mockResolvedValue(mockTasks);

      // Execute the service
      const result = await getAllTasksService();

      // Assertions
      expect(result).toEqual(mockTasks);
      expect(db.query.TasksTable.findMany).toHaveBeenCalled();
    });

    it('should return empty array if no tasks found', async () => {
      // Setup mock return value
      (db.query.TasksTable.findMany as jest.Mock).mockResolvedValue(null);

      // Execute the service
      const result = await getAllTasksService();

      // Assertions
      expect(result).toEqual([]);
      expect(db.query.TasksTable.findMany).toHaveBeenCalled();
    });
  });
});