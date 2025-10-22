const userInformation = [
    {
      username: 'user1@gmail.com',
      password: 'password1',
      todos: [
        { "id": 1, "task": "eat", "status": "Working", "dueDate": "2025-09-01" },
        { "id": 2, "task": "sleep", "status": "Done", "dueDate": "2025-09-02" }
      ],
      userRules: [],
      userHeavyJournal :[],
      userLightJournal :[],
      magicEntries: {}  
      
    },
    
    {
      username: 'user2@gmail.com',
      password: 'password2',
      todos: [
        { id: 1, task: "task 1", status: "Working", dueDate: "2025-09-01" },
        { id: 3, task: "task 3", status: "Stuck", dueDate: "2025-09-09" },
        { id: 2, task: "task 2", status: "Done", dueDate: "2025-09-03" }
      ]
      ,
      userRules: [],
      userHeavyJournal :[],
      userLightJournal :[],
      magicEntries: {}  
    }
  ];
  
  module.exports = userInformation;
  