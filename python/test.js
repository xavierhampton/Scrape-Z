const Test = async () => {
    const response = await fetch("http://localhost:5000", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ username: "example" }),
        
        // ...
      });
      console.log(response.ok)
}
a()
