const baseURL = "http://localhost:3000";
const token = `JSA ${localStorage.getItem("token")}`;
let globalProfile = {};
const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  authorization: token,
};
const clintIo = io(baseURL, {
  auth: { authorization: token },
});

//images links
let avatar = "./avatar/Avatar-No-Background.png";
let meImage = "./avatar/Avatar-No-Background.png";
let friendImage = "./avatar/Avatar-No-Background.png";

//save socket id
// clintIo.emit("updateSocketId", { token })

//collect messageInfo
function sendMessage(destId) {
  console.log({ destId });
  const data = {
    message: $("#messageBody").val(),
    destId,
  };

  clintIo.emit("sendMessage", data);
}

//sendCompleted
clintIo.on("successMessage", (data) => {
  const { message } = data;
  meImage = avatar;
  friendImage = avatar;

  const div = document.createElement("div");

  div.className = "me text-end p-2";
  div.dir = "rtl";
  div.innerHTML = `
    <img class="chatImage" src="${meImage}" alt="" srcset="">
    <span class="mx-2">${message}</span>
    `;
  document.getElementById("messageList").appendChild(div);
  $(".noResult").hide();
  $("#messageBody").val("");
});

//receiveMessage
clintIo.on("receiveMessage", (data) => {
  console.log({ RM: data });
  const { message } = data;

  const div = document.createElement("div");
  div.className = "myFriend p-2";
  div.dir = "ltr";
  div.innerHTML = `
    <img class="chatImage" src="${friendImage}" alt="" srcset="">
    <span class="mx-2">${message}</span>
    `;
  document.getElementById("messageList").appendChild(div);
});

// ******************************************************************** Show chat conversation
function showData(destId, chat) {
  document
    .getElementById("sendMessage")
    .setAttribute("onclick", `sendMessage('${destId}')`);

  document.getElementById("messageList").innerHTML = "";
  if (chat.messages?.length) {
    $(".noResult").hide();

    for (const message of chat.messages) {
      // {sender, message}
      if (message.sender?._id.toString() == globalProfile._id.toString()) {
        const div = document.createElement("div");
        div.className = "me text-end p-2";
        div.dir = "rtl";
        div.innerHTML = `
                <img class="chatImage" src="${meImage}" alt="" srcset="">
                <span class="mx-2">${message.message}</span>
                `;
        document.getElementById("messageList").appendChild(div);
      } else {
        const div = document.createElement("div");
        div.className = "myFriend p-2";
        div.dir = "ltr";
        div.innerHTML = `
                <img class="chatImage" src="${friendImage}" alt="" srcset="">
                <span class="mx-2">${message.message}</span>
                `;
        document.getElementById("messageList").appendChild(div);
      }
    }
  } else {
    const div = document.createElement("div");

    div.className = "noResult text-center  p-2";
    div.dir = "ltr";
    div.innerHTML = `
        <span class="mx-2">Say Hi to start the conversation.</span>
        `;
    document.getElementById("messageList").appendChild(div);
  }
}

//get chat conversation between 2 users and pass it to ShowData fun
function displayChatUser(userId) {
  // console.log({ userId });
  axios({
    method: "get",
    url: `${baseURL}/chat/${userId}`,
    headers,
  })
    .then(function (response) {
      const chat  = response.data?.data;
      console.log({ chat });
      if (chat) {
        if (chat.senderId?._id.toString() == globalProfile._id.toString()) {
          meImage = avatar;
          friendImage = avatar;
        } else {
          friendImage = avatar;
          meImage = avatar;
        }

        showData(userId, chat);
      } else {
        showData(userId, 0);
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log({ status: error.status });
      if (error.status == 404) {
        showData(userId, 0);
      } else {
        alert("Ops something went wrong");
      }
    });
}
// ********************************************************************

// ==============================================================================================

// ********************************************************* Show Users list
// Display Users
function getUserData() {
  axios({
    method: "get",
    url: `${baseURL}/user/profile`,
    headers,
  })
    .then(function (response) {

      const profile = response.data?.data;
      console.log(profile);
      
      globalProfile = profile;
      document.getElementById("userName").innerHTML = `${profile.firstName}`;
      showUsersData(profile.users);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Show friends list
function showUsersData(users = []) {
  let cartonna = ``;
  for (let i = 0; i < users.length; i++) {
    cartonna += `
        <div onclick="displayChatUser('${users[i]._id}')" class="chatUser my-2">
        <img class="chatImage" src="${
          users[i].profilePic?.secure_url || avatar
        }" alt="" srcset="">
        <span class="ps-2">${users[i].userName}</span>
    </div>
        
        `;
  }

  document.getElementById("chatUsers").innerHTML = cartonna;
}
getUserData();
// ********************************************************* Show Users list
