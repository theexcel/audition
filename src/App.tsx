import "./App.css";
import { useState, useEffect } from "react";
import Icon from './checkmark.svg'

type taskType = {
  id: number,
  task: string
  checked: boolean
}

type itemList = {
  category: string,
  tasks: taskType[]
}

const initialData: itemList[] = [
  {
    category: "Foundation",
    tasks: [
      {
        id: 11,
        task: "Setup virtual office",
        checked: false
      },
      {
        id: 12,
        task: "Set mission & vision",
        checked: false
      },
      {
        id: 13,
        task: "Select business name",
        checked: false,
      },
      {
        id: 14,
        task: "Buy domains",
        checked: false,
      },
    ],
  },
  {
    category: "Discovery",
    tasks: [
      {
        id: 15,
        task: "Create roadmap",
        checked: false,
      },
      {
        id: 16,
        task: "Competitor analysis",
        checked: false,
      },
    ],
  },
  {
    category: "Delivery",
    tasks: [
      {
        id: 17,
        task: "Release marketing website",
        checked: false,
      },
      {
        id: 18,
        task: "Release MVP",
        checked: false
      },
    ],
  },
]

const App: React.FC = () => {
  const [items, setItems] = useState<itemList[]>(() => {
    const savedData = localStorage.getItem('items');
    return savedData ? JSON.parse(savedData) : initialData
  }
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const handleCheck = (id: number) => {
    const updatedItems = items.map((item) => ({
      category: item.category,
      tasks: item.tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      ),
    }));
    setItems(updatedItems);

  };



  return (
  <div className="App">
    <h1>My Startup Progress</h1>
    <div className="app-body"> 
    {items.map(({ category, tasks }, index) => (
      <div key={index} >
        <div className="category-header">
        <div>{index + 1}</div>
          <h2>{category}</h2>
          {tasks.every((task) => task.checked) && <img src = {Icon} />}
        </div>
        <ul>
          {tasks.map(({ id, task, checked }) => (
            <li key={id}>
              <div className="task-item">
                <input 
                type="checkbox" 
                checked={checked} 
                onChange={() => handleCheck(id)}
                />
                <label
                onChange={() => handleCheck(id)}
                >{task}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
   
    </div>
    <button>Click Me</button>
  </div>
);

};

export default App;
