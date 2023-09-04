import "./App.css";
import { useState } from "react";

type taskType = {
  id: number,
  task: string
  checked: boolean
}

type itemList = {
  category: string,
  tasks: taskType[]
}

const App: React.FC = () => {
  const [items, setItems] = useState<itemList[]>(
    [
      {
        category: "Foundation",
        tasks: [
          {
            id: 1,
            task: "Setup virtual office",
            checked: false
          },
          {
            id: 2,
            task: "Set mission & vision",
            checked: false
          },
          {
            id: 3,
            task: "Select business name",
            checked: false,
          },
          {
            id: 4,
            task: "Buy domains",
            checked: false,
          },
        ],
      },
      {
        category: "Discovery",
        tasks: [
          {
            id: 1,
            task: "Create roadmap",
            checked: false,
          },
          {
            id: 2,
            task: "Competitor analysis",
            checked: false,
          },
        ],
      },
      {
        category: "Delivery",
        tasks: [
          {
            id: 1,
            task: "Release marketing website",
            checked: false,
          },
          {
            id: 2,
            task: "Release MVP",
            checked: false
          },
        ],
      },
    
    ]
  )



  return (
    <div className="App">
      {
        items.map(({category, tasks}, index) => (
          <div>
            <h2>{category}</h2>
            <ul>
              {
                tasks.map(({id, task}) => (
                  <li key = {id}>{task}</li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  );
};

export default App;
