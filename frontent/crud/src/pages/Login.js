import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function Login() {
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.target[0].value,
            password: e.target[1].value
        })
      }).then(response => response.json())
      .then(response => {
          if(response.success === 1){
              alert("Login Successful");
              localStorage.setItem("isLogin", "true"); // after login success
              navigate("/");
          } else {
              alert("Invalid email or password");
          }});
          
};


    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Login Box */}
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      <Link to="/register" className="flex align-center justify-center mt-3 "><button className="bg-blue-500 text-white py-3 rounded text-center p-3">Register</button> </Link>
      </div>
    </div>

  );

}
