import "./App.css";
import { useState, useEffect } from "react";
import Icon from './checkmark.svg'
import {Link} from 'react-router-dom'

type taskType = {
  id: number,
  task: string,
  checked: boolean,
  closed: boolean
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
        checked: false,
        closed: false
      },
      {
        id: 12,
        task: "Set mission & vision",
        checked: false,
        closed: false,
      },
      {
        id: 13,
        task: "Select business name",
        checked: false,
        closed: false,
      },
      {
        id: 14,
        task: "Buy domains",
        checked: false,
        closed: false,
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
        closed: false,
      },
      {
        id: 16,
        task: "Competitor analysis",
        checked: false,
        closed: false,
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
        closed: false,
      },
      {
        id: 18,
        task: "Release MVP",
        checked: false,
        closed: false
      },
    ],
  },
]

const App: React.FC = () => {

  const [fact, setFact] = useState<string>('');
  const [items, setItems] = useState<itemList[]>(() => {
    const savedData = localStorage.getItem('items');
    return savedData ? JSON.parse(savedData) : initialData
  }
  )

  const [lockedCategory, setLockedCategory] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const handleCheck = (id: number) => {
    const updatedItems = items.map((item) => ({
      category: item.category,
      tasks: item.tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked, closed: !task.closed } : task
      ),
    }));
    setItems(updatedItems);

  };

  useEffect(() => {
    const lockedCategoryIndex = items.findIndex(({category, tasks}) => tasks.some((task) => !task.checked));

    if(lockedCategoryIndex === -1){

    //   if(lockedCategory !== null && lockedCategoryIndex !== -1){
    //   setLockedCategory(items[lockedCategoryIndex].category)
    // }
    setLockedCategory(null)
  } else {
    setLockedCategory(items[lockedCategoryIndex].category);
  }

  }, [items])

  useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/random.json')
    .then((response) => response.json())
    .then((data) => {
      setFact(data.text)
    })
    .catch((error) => {
      console.log('Error hetching random fact:', error)
    })
  }, [])



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
          {tasks.map(({ id, task, checked, closed }) => (
            <li key={id}>
              <div className="task-item">
                <input 
                type="checkbox" 
                checked={checked} 
                onChange={() => handleCheck(id)}
                />
                <label
                className = {closed ? 'line-through-animation' : ''}
                onClick={() => handleCheck(id)}
                >{task}</label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
   
    </div>
    {lockedCategory && (
      <p>Next phase: {lockedCategory}</p>
    )}
    <div style = {{display: lockedCategory ? 'none': 'flex', marginTop: '1rem'}}>{fact}</div>
<Link to = {lockedCategory ? '/' : '/complete'}>
<button style = {{width: '10rem', height: '2rem', marginTop: '1rem', borderRadius: '4px', backgroundColor: 'blue', color: 'white', display: lockedCategory ? 'none': '', border: 'none', fontWeight: 'bold'}} 
disabled={lockedCategory !== null}
>Finish</button>
</Link>
    
  </div>
);

};

export default App;
