const baseURL = "http://localhost:3000";

$("#login").click(() => {
  const email = $("#email").val();
  const password = $("#password").val();
  const data = {
    email,
    password,
  };
  axios({
    method: "post",
    url: `${baseURL}/auth/signin`,
    data: data,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then(function (response) {
      
      const { success } = response.data;
      if (success) {
        localStorage.setItem("token", response.data.data.access_token);
        window.location.href = "index.html";
      } else {
        console.log("In-valid email or password");
        alert("In-valid email or password");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
