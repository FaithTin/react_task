import "./App.css";
import React from "react";
import axios from "axios";
import TableData from "./components/TableData";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://malih-auth.ap-southeast-2.elasticbeanstalk.com/campaign/getAllUploadedEmails/listId/480"
      );
      setItems(response.data);
      console.log(response.data)
    };
    fetchData();
  }, []);
  
  return (
      <div>
       <TableData arrayData={items}/>
      </div>
  
    
  );
}

export default App;
