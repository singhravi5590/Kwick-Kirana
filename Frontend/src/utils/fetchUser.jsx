export async function fetchUserdetails(){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/get-user`, {
      method : "GET",
      headers : {
        'authorization' : localStorage.getItem('accessToken'),
      },
    })
    const result = await response.json();
    return result;
  }