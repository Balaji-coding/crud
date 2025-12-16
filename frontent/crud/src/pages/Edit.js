import { useEffect, useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
export function Edit() {
    const navigate = useNavigate();
      const location = useLocation();
  const user = location.state;
  const edit= user;
  const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: edit.name,
        age: edit.age,
        gender: edit.gender,
        email: edit.email,
        password: edit.password,
        confirmPassword: edit.password
    });
  const validate = () => {
    let newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.age) {
      newErrors.age = "Please select your age";
    }

    if (!data.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }


    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Password is required";
    } else if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Password mismatch";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        fetch('http://localhost:8000/api/edit',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: edit._id,
                name: data.name,
                age: data.age,
                gender : data .gender,
                email: data.email,
                password: data.password
            })
        }
        ).then(response => response.json())
        .then(response => {
            if(response.success === 1){
                alert("Data Updated Successfully");
                navigate("/");
            } else {
                alert("Failed to update data");
            }
            
            console.log("Data:", response);
        })
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value,'darta');

    setData({ ...data, [name]: value });

    setErrors((prevErrors) => ({
        ...prevErrors,  
        [name]: ""
    }));
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit</h2>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Age */}
          <div>
            <p className="font-medium">Age :{data.age}</p>
            <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                    <input
                        type="range"
                        name="age"
                        min="18"
                        max="100"
                        value={data.age}
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
                    checked={data.gender === g}
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
            value={data.email}
            onChange={handleChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
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
              value={data.password}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
        </form>
      </div>
        <Link to="/"><button className="absolute top-5 left-5 bg-gray-300 text-black px-3 py-1 rounded">Back</button></Link>
    </div>

    );
}