const handleRegister = async () => {
  const studentData = {
      name,
      email,
      password,  // Don't forget the password field if needed
      role: 'student', // Specify the role for registration
  };

  try {
      const response = await fetch("http://localhost:5001/api/auth/register", {  // Correct endpoint for registration
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
      });

      const data = await response.json();
      console.log(data);  // Handle response here (e.g., show success message)
  } catch (error) {
      console.error("Error:", error);  // Handle error
  }
};
