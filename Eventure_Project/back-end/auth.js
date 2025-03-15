const handleRegister = async () => {
    const studentData = {
      name,
      email,
      age,
    };
  
    try {
      const response = await fetch("http://localhost:5001/models/Students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  