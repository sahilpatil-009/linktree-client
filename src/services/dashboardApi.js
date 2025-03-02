const URL = "http://localhost:8080";

// get links data
export const getLinkData = async (data) => {
  return fetch(`${URL}/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

// update profile
export const updateProfile = async (data) => {
  return fetch(`${URL}/dashboard/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

// get render profile

export const getRenderProfile = async (username) => {
  return fetch(`${URL}/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const increaseLinkCount = async (data) => {
  return fetch(`${URL}/updatecount`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const increaseShopcount = async (data) => {
  return fetch(`${URL}/updateshopcont`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get links data
export const getAnalytics = async () => {
  return fetch(`${URL}/dashboard/analytics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};


// export const userRegister = async (data) => {
//     return fetch(`${URL}/user/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
// };
