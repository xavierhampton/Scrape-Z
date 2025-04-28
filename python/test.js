const Test = async () => {
    const response = await fetch("http://localhost:5000", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Add any other headers you need here
        },
        // If you need to send a body with the request, you can do so like this:
        
       
        
        // ...
      });
      console.log(await response.json())
}
Test()
