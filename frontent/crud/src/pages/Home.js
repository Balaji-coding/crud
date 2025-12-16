import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
export function Home() {
  const [data, setData]= useState([]);
  const [copy, setCopy]= useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  useEffect(() => {
      fetch("http://localhost:8000/api/alldata").then((response) =>
      response.json().then((data) => {
      setData(data);
      })
    );
  }, []);

    const deleteItem =(_id)=>{
      fetch("http://localhost:8000/api/delete",{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({
          _id: _id
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("Deleted:", data);
              fetch("http://localhost:8000/api/alldata").then((response) =>
              response.json().then((data) => {
              setData(data);
              })
            );
      })

    }
  
    const logout = () => {
      localStorage.removeItem("isLogin");
    window.location.reload();
    };


    function handleSearch(e){
      const searchingValue = e.target.value.toLowerCase();
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchingValue)
      );
      setCopy(filteredData);
      console.log("Filtered Data:", filteredData);
    }

    return (
        <div>
          <div>
            <h1 className="text-3xl font-bold text-center bg-blue-200 p-5 rounded">
                Welcome to the Home Page
            </h1>
            <div className="text-end">
            <button onClick={logout} className="bg-red-500 p-2 rounded m-2 font-bold">Log out</button>
            </div>
            <div className="flex justify-center">
              <input 
              type="text"
              placeholder="Search name"
              className="border p-2 rounded w-1/4"
              onChange={handleSearch}
              
              />
            </div>
          </div>

            <div className="overflow-x-auto m-5">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg ">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">age</th>
            <th className="py-3 px-6 text-left">gender</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Password</th>
            <th className="py-3 px-6 text-left">Edit</th>
            <th className="py-3 px-6 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {copy.length > 0 ? copy.map((user,index) => (
                        <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.age}</td>
              <td className="py-3 px-6">{user.gender}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.password}</td>
              <td className="py-3 px-6"><Link to='/edit' state={user}> <i className="fas fa-edit"></i></Link>  </td>
              <td className="py-3 px-6"><i className="fas fa-trash" onClick={()=> deleteItem(user._id)}></i></td>
            </tr>
          )) :
          currentRecords.map((user,index) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.age}</td>
              <td className="py-3 px-6">{user.gender}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.password}</td>
              <td className="py-3 px-6"><Link to='/edit' state={user}> <i className="fas fa-edit"></i></Link>  </td>
              <td className="py-3 px-6"><i className="fas fa-trash" onClick={()=> deleteItem(user._id)}></i></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-2 mt-5">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>

      <div className="m-5 flex justify-center align-center">
      <Link to="/add-data"><button className="bg-blue-500 text-white rounded px-4 py-2">Add Data</button></Link>
      </div>
    </div>
        </div>
    );
}
