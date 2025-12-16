import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
export function AddData() {
    const navigate = useNavigate();
      const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    
      const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value,'darta');
    
      setFormData({ ...formData, [name]: value });
    
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ""
      }));
    };
    
    
      const validate = () => {
        let newErrors = {};
    
        if (!formData.name.trim()) {
          newErrors.name = "Name is required";
        }
    
        if (!formData.age) {
          newErrors.age = "Please select your age";
        }
    
        if (!formData.gender) {
          newErrors.gender = "Please select gender";
        }
    
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
    
    
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Password is required";
        } else if (formData.confirmPassword !== formData.password) {
          newErrors.confirmPassword = "Password mismatch";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validate()) {
          console.log("Form Submitted:", formData);
          // API call here
                  fetch("http://localhost:8000/api/addData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    age: formData.age,
                    gender: formData.gender,
                    email: formData.email,
                    password: formData.password
                })
            })
            .then(response => response.json())
            .then(response => {
                response.success === 1 ? alert("Data Added Successfully") :  alert("Failed to add data");
                navigate("/");
            })
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
          <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>
    
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
    
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    
              {/* Age */}
              <div>
                <p className="font-medium">Age :{formData.age}</p>
                <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2">
                        <input
                            type="range"
                            name="age"
                            min="18"
                            max="100"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
              </div>
    
              {/* Gender */}
              <div>
                <p className="font-medium">Gender</p>
                <div className="flex gap-4 mt-1">
                  {["male", "female"].map((g) => (
                    <label key={g} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        onChange={handleChange}
                      />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
    
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    
              {/* Password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
    
              {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
    
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm Password"
                  onKeyUp={handleChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
    
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
          </div>
    
        </div>
      );
}